import { ipcMain, shell, dialog } from "electron";
import ProjectInterface from "../shared/types/project.interface";
import loadFile from "./fs/loadFile";
import saveFile from "./fs/saveFile";
import getFileList from "./fs/getFileList";
import getThumbnail from "./fs/getThumbnail";
import generateThumbnail from "./fs/generateThumbnail";
import * as path from "path";
import FileInterface from "../shared/types/file.interface";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
import isProjectStructure from "./fs/isProjectStructure";
export default class ChannelManager {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";
    static PROJECT_THUMBNAIL_FILE = "thum.jpg";
    _projectPath: string;
    constructor() {
        ipcMain.on(
            IpcProviderResourceEnums.SET_PROJECT,
            (event, responseChannel: string) => {
                event.reply(IpcProviderResourceEnums.SET_LOADER_MESSAGE, "Waiting for project path");
                dialog.showOpenDialog(
                    {
                        properties: ["openDirectory"]
                    },
                    fileNames => {
                        this._projectPath = fileNames[0];
                        event.reply(responseChannel);
                    }
                );
            }
        );
        ipcMain.on(IpcProviderResourceEnums.GET_PROJECT, (event, responseChannel: string) => {
            console.log("Get Project ", this._projectPath);
            event.reply(responseChannel, this._projectPath);
        });

        ipcMain.on(
            IpcProviderResourceEnums.SAVE_PROJECT,
            async (event, responseChannel: string, project: ProjectInterface) => {
                await saveFile(
                    path.resolve(this.getProjectPath(), ChannelManager.PROJECT_FOLDER),
                    ChannelManager.PROJECT_FILE_NAME,
                    ChannelManager.PROJECT_THUMBNAIL_FOLDER,
                    JSON.stringify(project)
                );
                event.reply(responseChannel);
            }
        );
        ipcMain.on(IpcProviderResourceEnums.IS_EXIST_PROJECT, async (event, responseChannel: string) => {
            event.reply(IpcProviderResourceEnums.SET_LOADER_MESSAGE, "Checking if project exist");
            const isProject = await isProjectStructure(
                this.getProjectPath(),
                ChannelManager.PROJECT_FOLDER
            );
            event.reply(responseChannel, isProject);
        });

        ipcMain.on(IpcProviderResourceEnums.LOAD_PROJECT, async (event, responseChannel: string) => {
            event.reply(IpcProviderResourceEnums.SET_LOADER_MESSAGE, "Loading project");
            const projectFileString = await loadFile(
                this.getProjectPath(),
                ChannelManager.PROJECT_FOLDER,
                ChannelManager.PROJECT_FILE_NAME
            );
            const projectFile: ProjectInterface = JSON.parse(projectFileString);
            event.reply(responseChannel, projectFile);
        });

        ipcMain.on(IpcProviderResourceEnums.EXECUTE_RESOURCE, (event, resourcePath: string) => {
            shell.openItem(path.join(this.getProjectPath(), resourcePath));
        });

        ipcMain.on(IpcProviderResourceEnums.GET_LIST_RESOURCE, async (event, responseChannel: string) => {
            const fileList: Array<FileInterface> = await getFileList(
                this.getProjectPath()
            );
            event.reply(responseChannel, fileList);
        });

        ipcMain.on(
            IpcProviderResourceEnums.GET_THUMBNAIL,
            async (
                event,
                responseChannel: string,
                { id: resourceId, filePath: resourcePath }
            ) => {
                const thumbnail: string = await getThumbnail(
                    path.resolve(
                        this.getProjectPath(),
                        ChannelManager.PROJECT_FOLDER,
                        ChannelManager.PROJECT_THUMBNAIL_FOLDER,
                        resourceId,
                        ChannelManager.PROJECT_THUMBNAIL_FILE
                    )
                );
                if (thumbnail) {
                    event.reply(responseChannel, thumbnail);
                } else {
                    const newThumbnail: string = await generateThumbnail(
                        path.resolve(this.getProjectPath(), resourcePath),
                        path.resolve(
                            this.getProjectPath(),
                            ChannelManager.PROJECT_FOLDER,
                            ChannelManager.PROJECT_THUMBNAIL_FOLDER,
                            resourceId
                        ),
                        ChannelManager.PROJECT_THUMBNAIL_FILE
                    );
                    if (newThumbnail) {
                        event.reply(responseChannel, newThumbnail);
                    } else {
                        event.reply(responseChannel, null);
                    }
                }
            }
        );
    }

    private getProjectPath(): string {
        return this._projectPath;
    }
}
