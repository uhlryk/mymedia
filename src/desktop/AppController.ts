import { shell, dialog } from "electron";
import ProjectModelInterface from "../shared/types/projectModel.interface";
import setInitProject from "./fs/setInitProject";
import * as path from "path";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
import isProjectStructure from "./fs/isProjectStructure";
import ProjectManager from "./ProjectManager";
import ThumbnailManager from "./modules/thumbnails/ThumbnailManager";
import ThumbnailChangeEventInterface from "../shared/types/thumbnailChangeEvent.interface";
import Listener from "./core/Listener";

export default class AppController {
    _projectPath: string;
    _projectManager: ProjectManager;
    _isDestroyed: boolean = false;
    constructor(projectPath: string) {
        this._projectPath = projectPath;
        Listener.on(IpcProviderResourceEnums.CREATE_PROJECT, async context => {
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
            context.reply.send();
        });

        Listener.on(IpcProviderResourceEnums.LOAD_PROJECT, async context => {
            context.loader.setMessage("Loading project");
            if (!(await this.testProjectPath())) {
                context.reply.send();
            } else {
                this._projectManager = new ProjectManager(this._projectPath);
                const projectModel: ProjectModelInterface = await this._projectManager.loadProjectModel(
                    context.loader
                );
                await this._projectManager.save();
                context.reply.send(projectModel);
            }
        });
        Listener.on(IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE, async context => {
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
                    context.reply
                        .getEvent()
                        .reply(
                            IpcProviderResourceEnums.ON_THUMBNAIL_CHANGE,
                            thumbnailChangeEventInterface
                        );
                }
            );
        });
        Listener.on(IpcProviderResourceEnums.GET_PROJECT, context => {
            console.log("Get Project ", this._projectPath);
            context.reply.send(this._projectPath);
        });
        Listener.on(IpcProviderResourceEnums.SAVE_PROJECT, async context => {
            const project: ProjectModelInterface = context.data[0];
            await this._projectManager.setProjectModel(project);
            await this._projectManager.save();
            context.reply.send();
        });

        Listener.on(IpcProviderResourceEnums.EXECUTE_RESOURCE, context => {
            const resourcePath: string = context.data[0];
            shell.openItem(path.join(this.getProjectPath(), resourcePath));
        });
    }

    public destroy() {
        this._isDestroyed = true;
        Listener.removeAllListeners(IpcProviderResourceEnums.CREATE_PROJECT);
        Listener.removeAllListeners(IpcProviderResourceEnums.LOAD_PROJECT);
        Listener.removeAllListeners(IpcProviderResourceEnums.GET_PROJECT);
        Listener.removeAllListeners(IpcProviderResourceEnums.SAVE_PROJECT);
        Listener.removeAllListeners(IpcProviderResourceEnums.EXECUTE_RESOURCE);
        Listener.removeAllListeners(IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE);
        if (this._projectManager) {
            this._projectManager.destroy();
        }
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
