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
export default class Project {
    static PROJECT_FOLDER = ".mymedia";
    private static projectInstance: Project;
    private readonly resourceFolderPath;
    private readonly projectFolderPath;
    private readonly store: Store;


    private _thumbnailManager: ThumbnailManager;

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
        await syncDbWithFs(this.resourceFolderPath, this.store);
        const thumbnailMap: Map<
            string,
            Array<string>
            > = await this._thumbnailManager.loadExistingThumbnails();
        const resourceList = this.store.getResourceList();
        resourceList.map((resource: IResource) => {
            if (thumbnailMap.has(resource.id)) {
                const thumbnailList: Array<string> = thumbnailMap.get(resource.id);
                this._thumbnailManager.queueGenerateMissingThumbnails(
                    resource,
                    thumbnailList
                );
                resource.thumbnailList = thumbnailList;
            } else {
                this._thumbnailManager.queueGenerateAllThumbnails(resource);
            }
        });
        this.store.setResourceList(resourceList);
        //    await ensureProjectFolder(this.projectFolderPath);

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
        Listener.on(IpcProviderResourceEnums.REGISTER_RESOURCE_CHANGE_LISTENER, async context => {
            console.log("start listening for thumbnails");
            this._thumbnailManager.execute((resourceId: string, resourceThumbnailPath: string, index: number) => {
                console.log("==AAAAAAAAAAAa==");
                console.log(resourceId, resourceThumbnailPath);
            });
            // context.reply
            //     .getEvent()
            //     .reply(
            //         IpcProviderResourceEnums.ON_RESOURCE_CHANGE,
            //         thumbnailChangeEvent
            //     );
        });
    }

    private removeHandlers() {}
    public destroy() {
        this.removeHandlers();
    }
}
