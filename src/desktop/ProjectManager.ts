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
import ResourceInterface from "../shared/types/resource.interface";
export default class ProjectManager {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";
    static PROJECT_THUMBNAIL_FILE = "thum.jpg";
    _projectPath: string;
    _project: ProjectInterface;
    _resourceFileList: Array<FileInterface>;
    constructor(projectPath: string) {
        this._projectPath = projectPath;

        ipcMain.on(
            IpcProviderResourceEnums.GET_PROJECT,
            (event, responseChannel: string) => {
                console.log("Get Project ", this._projectPath);
                event.reply(responseChannel, this._projectPath);
            }
        );

        ipcMain.on(
            IpcProviderResourceEnums.SAVE_PROJECT,
            async (event, responseChannel: string, project: ProjectInterface) => {
                await this.saveProject(project);
                event.reply(responseChannel);
            }
        );

        ipcMain.on(
            IpcProviderResourceEnums.LOAD_PROJECT,
            async (event, responseChannel: string) => {
                event.reply(
                    IpcProviderResourceEnums.SET_LOADER_MESSAGE,
                    "Loading project"
                );
                if (!(await this.testProjectPath())) {
                    event.reply(responseChannel);
                }
                await this.loadProjectFile();

                event.reply(responseChannel, this._project);
            }
        );

        ipcMain.on(
            IpcProviderResourceEnums.EXECUTE_RESOURCE,
            (event, resourcePath: string) => {
                shell.openItem(path.join(this.getProjectPath(), resourcePath));
            }
        );

        ipcMain.on(
            IpcProviderResourceEnums.GET_LIST_RESOURCE,
            async (event, responseChannel: string) => {
                event.reply(IpcProviderResourceEnums.SET_LOADER_MESSAGE, "Loading files");
                await this.loadResourceFileList(event);
                event.reply(responseChannel, this._resourceFileList);
            }
        );

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
                        ProjectManager.PROJECT_FOLDER,
                        ProjectManager.PROJECT_THUMBNAIL_FOLDER,
                        resourceId,
                        ProjectManager.PROJECT_THUMBNAIL_FILE
                    )
                );
                if (thumbnail) {
                    event.reply(responseChannel, thumbnail);
                } else {
                    const newThumbnail: string = await generateThumbnail(
                        path.resolve(this.getProjectPath(), resourcePath),
                        path.resolve(
                            this.getProjectPath(),
                            ProjectManager.PROJECT_FOLDER,
                            ProjectManager.PROJECT_THUMBNAIL_FOLDER,
                            resourceId
                        ),
                        ProjectManager.PROJECT_THUMBNAIL_FILE
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

    public async saveProject(project) {
        this._project = project;
        await saveFile(
            path.resolve(this.getProjectPath(), ProjectManager.PROJECT_FOLDER),
            ProjectManager.PROJECT_FILE_NAME,
            ProjectManager.PROJECT_THUMBNAIL_FOLDER,
            JSON.stringify(project)
        );
    }
    public async testProjectPath() {
        const isProject = await isProjectStructure(
            this.getProjectPath(),
            ProjectManager.PROJECT_FOLDER
        );
        return isProject;
    }
    private async loadProjectFile() {
        const projectFileString = await loadFile(
            this.getProjectPath(),
            ProjectManager.PROJECT_FOLDER,
            ProjectManager.PROJECT_FILE_NAME
        );
        this._project = JSON.parse(projectFileString);
    }

    private async loadResourceFileList(event) {
        this._resourceFileList = await getFileList(this.getProjectPath());
    }

    // private async generateResources(event) {
    //     this._project.resourceList.map((resource: ResourceInterface) => {
    //         resource.isRemoved = true;
    //     });
    //     this._resourceFileList.forEach((file:FileInterface) => {
    //         const resource = this._project.resourceList.find((resource: ResourceInterface) => resource.filePath === file.filePath);
    //         if(resource) {
    //             resource.isRemoved = false;
    //         } else {
    //             const newResource = {
    //
    //             }
    //         }
    //     })
    // }
    private getProjectPath(): string {
        return this._projectPath;
    }
}
