import { ipcMain, shell, dialog } from "electron";
import ProjectModelInterface from "../shared/types/projectModel.interface";
import setInitProject from "./fs/setInitProject";
import * as path from "path";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
import isProjectStructure from "./fs/isProjectStructure";
import Loader from "./Loader";
import ProjectManager from "./ProjectManager";
import ThumbnailManager from "./modules/thumbnails/ThumbnailManager";
import ThumbnailChangeEventInterface from "../shared/types/thumbnailChangeEvent.interface";

export default class AppController {
    _projectPath: string;
    _projectManager: ProjectManager;
    constructor(projectPath: string) {
        this._projectPath = projectPath;
        ipcMain.removeAllListeners(IpcProviderResourceEnums.CREATE_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.LOAD_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.GET_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.SAVE_PROJECT);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.EXECUTE_RESOURCE);
        ipcMain.removeAllListeners(IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE);
        ipcMain.on(
            IpcProviderResourceEnums.CREATE_PROJECT,
            async (event, responseChannel: string) => {
                console.log("Create Project ", this._projectPath);
                await setInitProject(
                    path.resolve(this.getProjectPath(), ProjectManager.PROJECT_FOLDER),
                    ProjectManager.PROJECT_FILE_NAME,
                    ThumbnailManager.PROJECT_THUMBNAIL_FOLDER,
                    JSON.stringify({
                        resourceList: [],
                        tagList: []
                    })
                );
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
                    this._projectManager = new ProjectManager(this._projectPath);
                    const projectModel: ProjectModelInterface = await this._projectManager.loadProjectModel(loader);
                    await this._projectManager.save();
                    event.reply(responseChannel, projectModel);
                }
            }
        );
        ipcMain.on(
            IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE,
            async (event, responseChannel: string) => {
                console.log("start listening for thumbnails");
                this._projectManager.listenForThumbnails(
                    (resourceId: string, resourceThumbnailPath: string, index: number) => {
                        console.log("====");
                        console.log(resourceId, resourceThumbnailPath);
                        const thumbnailChangeEventInterface: ThumbnailChangeEventInterface = {
                            resourceId,
                            resourceThumbnailPath,
                            videoIndex: index
                        };
                        event.reply(
                            IpcProviderResourceEnums.ON_THUMBNAIL_CHANGE,
                            thumbnailChangeEventInterface
                        );
                    }
                );
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
            async (event, responseChannel: string, project: ProjectModelInterface) => {
                await this._projectManager.setProjectModel(project);
                await this._projectManager.save();
                event.reply(responseChannel);
            }
        );

        ipcMain.on(
            IpcProviderResourceEnums.EXECUTE_RESOURCE,
            (event, resourcePath: string) => {
                shell.openItem(path.join(this.getProjectPath(), resourcePath));
            }
        );
    }

    public async testProjectPath() {
        const isProject = await isProjectStructure(
            this.getProjectPath(),
            ProjectManager.PROJECT_FOLDER
        );
        return isProject;
    }

    private getProjectPath(): string {
        return this._projectPath;
    }
}
