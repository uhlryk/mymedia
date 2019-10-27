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
import TagInterface from "../shared/types/tag.interface";
import uuid from "uuidv4";

export default class ProjectManager {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";
    static PROJECT_THUMBNAIL_FILE = "thum.jpg";
    _projectPath: string;
    _project: ProjectInterface;
    _fileList: Array<FileInterface>;
    constructor(projectPath: string) {
        this._projectPath = projectPath;

        ipcMain.on(
            IpcProviderResourceEnums.CREATE_PROJECT,
            async (event, responseChannel: string) => {
                await this.saveProject({
                    resourceList: [],
                    tagList: []
                });
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
                } else {
                    await this.loadProject();
                    event.reply(responseChannel, this._project);
                }
            }
        );

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
            IpcProviderResourceEnums.EXECUTE_RESOURCE,
            (event, resourcePath: string) => {
                shell.openItem(path.join(this.getProjectPath(), resourcePath));
            }
        );

        // ipcMain.on(
        //     IpcProviderResourceEnums.GET_LIST_RESOURCE,
        //     async (event, responseChannel: string) => {
        //         event.reply(IpcProviderResourceEnums.SET_LOADER_MESSAGE, "Loading files");
        //         await this.loadResourceFileList();
        //         event.reply(responseChannel, this._fileList);
        //     }
        // );

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

    private async loadProject() {
        await this.loadProjectFile();
        await this.loadResourceFileList();
        await this.generateResourceList();
        await this.saveProject(this._project);
    }
    private async loadProjectFile() {
        const projectFileString = await loadFile(
            this.getProjectPath(),
            ProjectManager.PROJECT_FOLDER,
            ProjectManager.PROJECT_FILE_NAME
        );
        this._project = JSON.parse(projectFileString);
    }

    private async loadResourceFileList() {
        this._fileList = await getFileList(this.getProjectPath());
    }

    private async generateResourceList() {
        this._project.resourceList.map((resource: ResourceInterface) => {
            resource.isRemoved = true;
            resource.isNew = false;
        });
        this._fileList.forEach((file: FileInterface) => {
            const resource = this._project.resourceList.find(
                (testResource: ResourceInterface) =>
                    testResource.filePath === file.filePath
            );
            if (resource) {
                resource.isRemoved = false;
            } else {
                const newResource = {
                    filePath: file.filePath,
                    fileName: file.fileName,
                    title: file.name,
                    size: file.size,
                    ranking: 0,
                    description: "",
                    id: uuid(),
                    tags: [],
                    isRemoved: false,
                    isNew: true
                };
                this._project.resourceList.push(newResource);
            }
        });
    }

    private getProjectPath(): string {
        return this._projectPath;
    }
}
