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
import IpcProviderLoaderEnums from "../shared/IpcProviderLoaderEnums";
import isProjectStructure from "./fs/isProjectStructure";
import ResourceInterface from "../shared/types/resource.interface";
import uuid from "uuidv4";
import Loader from "./Loader";

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
        ipcMain.removeAllListeners(IpcProviderResourceEnums.CREATE_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.LOAD_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.GET_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.SAVE_PROJECT);
        ipcMain.on(
            IpcProviderResourceEnums.CREATE_PROJECT,
            async (event, responseChannel: string) => {
                console.log("Create Project ", this._projectPath);
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
                const loader = new Loader(event);
                loader.setMessage("Loading project");
                if (!(await this.testProjectPath())) {
                    event.reply(responseChannel);
                } else {
                    await this.loadProject(loader);
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
                await saveFile(
                    path.resolve(this.getProjectPath(), ProjectManager.PROJECT_FOLDER),
                    ProjectManager.PROJECT_FILE_NAME,
                    ProjectManager.PROJECT_THUMBNAIL_FOLDER,
                    JSON.stringify(project)
                );
                event.reply(responseChannel);
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

    private async loadProject(loader: Loader) {
        await this.loadProjectFile();
        await this.loadResourceFileList();
        await this.generateResourceList(loader);
        // await this.loadThumbnailList();
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

    private async getThumbnail(resourceId: string, resourcePath: string) {
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
            return thumbnail;
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
                return newThumbnail;
            } else {
                return null;
            }
        }
    }

    private async loadResourceFileList() {
        this._fileList = await getFileList(this.getProjectPath());
    }

    private async generateResourceList(loader: Loader) {
        this._project.resourceList.map((resource: ResourceInterface) => {
            resource.isRemoved = true;
            resource.isNew = false;
        });

        await asyncForEach(this._fileList, async (file: FileInterface, index: number) => {
            const length: number = this._fileList.length;
            loader.setMessage("Preparing files");
            loader.setProgress(Math.ceil((index * 100) / length));
            const resource = this._project.resourceList.find(
                (testResource: ResourceInterface) =>
                    testResource.filePath === file.filePath
            );
            if (resource) {
                resource.isRemoved = false;
            } else {
                const id = uuid();
                const thumbnailPath = await this.getThumbnail(id, file.filePath);
                const newResource: ResourceInterface = {
                    filePath: file.filePath,
                    fileName: file.fileName,
                    title: file.name,
                    size: file.size,
                    ranking: 0,
                    description: "",
                    id: id,
                    tags: [],
                    isRemoved: false,
                    isNew: true,
                    thumbnailPath: thumbnailPath
                };
                this._project.resourceList.push(newResource);
            }
        });
    }

    private getProjectPath(): string {
        return this._projectPath;
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
