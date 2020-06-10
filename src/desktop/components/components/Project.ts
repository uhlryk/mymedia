import ensureProjectFolder from "./helpers/ensureProjectFolder";
import * as path from "path";
import Store from "./Store";
import syncDbWithFs from "./helpers/syncDbWithFs";
import getResourceList from "./handlers/getResourceList";
import getTagList from "./handlers/getTagList";
import saveTagList from "./handlers/saveTagList";
import updateResource from "./handlers/updateResource";
import removeResource from "./handlers/removeResource";
import Listener, { Context } from "../../core/Listener";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import getProjectList from "../handlers/getProjectList";
export default class Project {
    static PROJECT_FOLDER = ".mymedia";
    private static projectInstance: Project;
    private readonly resourceFolderPath;
    private readonly projectFolderPath;
    private readonly store: Store;
    public static async getNewProjectInstance(resourceFolderPath: string) {
        if (Project.projectInstance) {
            Project.projectInstance.destroy();
        }
        Project.projectInstance = new Project(resourceFolderPath);
        await Project.projectInstance.init();
    }

    constructor(resourceFolderPath) {
        this.resourceFolderPath = resourceFolderPath;
        this.projectFolderPath = path.resolve(
            this.resourceFolderPath,
            Project.PROJECT_FOLDER
        );
        this.store = new Store(this.projectFolderPath);
    }

    /**
     * create if doesn't exist project folder
     */
    public async init() {
        console.log("Init Project component");
        //    await ensureProjectFolder(this.projectFolderPath);
        await syncDbWithFs(this.resourceFolderPath, this.store);
        this.registerHandlers();
    }

    private registerHandlers() {
        Listener.on(
            IpcProviderResourceEnums.GET_RESOURCE_LIST,
            getResourceList.execute(this.store)
        );
        Listener.on(
            IpcProviderResourceEnums.GET_TAG_LIST,
            getTagList.execute(this.store)
        );
        Listener.on(
            IpcProviderResourceEnums.UPDATE_RESOURCE,
            updateResource.execute(this.store)
        );
        Listener.on(
            IpcProviderResourceEnums.SAVE_TAG_LIST,
            saveTagList.execute(this.store)
        );
        Listener.on(
            IpcProviderResourceEnums.REMOVE_RESOURCE,
            removeResource.execute(this.store, this.resourceFolderPath)
        );
    }

    private removeHandlers() {}
    public destroy() {
        this.removeHandlers();
    }
}
