import ensureProjectFolder from "./helpers/ensureProjectFolder";
import * as path from "path";
import Store from "./Store";
import syncDbWithFs from "./helpers/syncDbWithFs";
import getResourceList from "./handlers/getResourceList";
import getTagList from "./handlers/getTagList";
import saveTagList from "./handlers/saveTagList";
import updateResource from "./handlers/updateResource";
import removeResource from "./handlers/removeResource";
import removeTag from "./handlers/removeTag";
import Listener, { Context } from "../../core/Listener";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import getProjectList from "../handlers/getProjectList";
import IThumbnailChangeEvent from "../../../shared/types/thumbnailChangeEvent.interface";
import ThumbnailManager from "./modules/thumbnails/ThumbnailManager";
import IResource from "../../../shared/types/resource.interface";
import syncResourcesWithThumbnails from "./helpers/syncResourcesWithThumbnails";
import registerResourceChangeListener from "./handlers/registerResourceChangeListener";
export default class Project {
    static PROJECT_FOLDER = ".mymedia";
    private static projectInstance: Project;
    private readonly resourceFolderPath;
    private readonly projectFolderPath;
    private readonly store: Store;
    private readonly _thumbnailManager: ThumbnailManager;

    public static destroyInstance() {
        if (Project.projectInstance) {
            console.log("project instance exist");
            Project.projectInstance.destroy();
        }
    }
    public static async getNewProjectInstance(resourceFolderPath: string) {
        console.log("getNewProjectInstance");
        if (Project.projectInstance) {
            console.log("project instance exist");
            Project.projectInstance.destroy();
        }
        console.log("create project instance");
        Project.projectInstance = new Project(resourceFolderPath);
        console.log("init project instance");
        await Project.projectInstance.init();
    }

    constructor(resourceFolderPath) {
        this.resourceFolderPath = resourceFolderPath;
        this.projectFolderPath = path.resolve(
            this.resourceFolderPath,
            Project.PROJECT_FOLDER
        );
        this.store = new Store(this.projectFolderPath);

        this._thumbnailManager = new ThumbnailManager(
            this.resourceFolderPath,
            Project.PROJECT_FOLDER
        );
    }

    /**
     * create if doesn't exist project folder
     */
    public async init() {
        console.log("Init Project component");
        await this._thumbnailManager.init();
        const resourceList = this.store.getResourceList();
        const syncedResourceList = await syncDbWithFs(
            this.resourceFolderPath,
            resourceList
        );
        const thumbnailSyncedResourceList = await syncResourcesWithThumbnails(
            syncedResourceList,
            this._thumbnailManager
        );
        this.store.setResourceList(thumbnailSyncedResourceList);
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
        Listener.on(IpcProviderResourceEnums.REMOVE_TAG, removeTag.execute(this.store));
        Listener.on(
            IpcProviderResourceEnums.REGISTER_RESOURCE_CHANGE_LISTENER,
            registerResourceChangeListener.execute(this.store, this._thumbnailManager)
        );
    }

    private removeHandlers() {
        Listener.removeAllListeners(IpcProviderResourceEnums.GET_RESOURCE_LIST);
        Listener.removeAllListeners(IpcProviderResourceEnums.GET_TAG_LIST);
        Listener.removeAllListeners(IpcProviderResourceEnums.UPDATE_RESOURCE);
        Listener.removeAllListeners(IpcProviderResourceEnums.SAVE_TAG_LIST);
        Listener.removeAllListeners(IpcProviderResourceEnums.REMOVE_RESOURCE);
        Listener.removeAllListeners(IpcProviderResourceEnums.REMOVE_TAG);
        Listener.removeAllListeners(IpcProviderResourceEnums.REGISTER_RESOURCE_CHANGE_LISTENER);
    }
    public destroy() {
        console.log("destroy project");
        this.removeHandlers();
        this._thumbnailManager.destroy();
    }
}
