import IResource from "../../../shared/types/resource.interface";
import ITag from "../../../shared/types/tag.interface";
const ElectronStore = require("electron-store");
export default class Store {
    static RESOURCE_COLLECTION = "resources";
    static TAG_COLLECTION = "tags";
    private _store;

    constructor(projectFolderPath) {
        this._store = new ElectronStore({
            schema: {
                [Store.RESOURCE_COLLECTION]: {
                    type: "array"
                },
                [Store.TAG_COLLECTION]: {
                    type: "array"
                }
            },
            cwd: projectFolderPath
        });
    }
    setResourceList(resourceList: Array<IResource>) {
        this._store.set(Store.RESOURCE_COLLECTION, resourceList);
    }
    getResourceList(): Array<IResource> {
        return this._store.get(Store.RESOURCE_COLLECTION, []);
    }
    getTagList(): Array<ITag> {
        return this._store.get(Store.TAG_COLLECTION, []);
    }
    /*
    setTagList(tagList: Array<ITag>) {
        this._store.set(Store.TAG_COLLECTION, tagList);
    }


    getResourceByPath(filePath: string): IResource {
        return this.getResourceList().find(
            (resource: IResource) => resource.filePath === filePath
        );
    }
     */

    updateResource(resource: IResource) {
        let resourceList: Array<IResource> = this._store.get(
            Store.RESOURCE_COLLECTION,
            []
        );
        resourceList = resourceList.map(existingResource => {
            if (existingResource.id === resource.id) {
                return resource;
            } else {
                return existingResource;
            }
        });
        this._store.set(Store.RESOURCE_COLLECTION, resourceList);
    }
    getResourceById(id: string): IResource {
        return this.getResourceList().find((resource: IResource) => resource.id === id);
    }
    removeResource(resourceId: string) {
        let resourceList: Array<IResource> = this._store.get(
            Store.RESOURCE_COLLECTION,
            []
        );
        resourceList = resourceList.filter(existingResource => {
            return existingResource.id !== resourceId;
        });
        this._store.set(Store.RESOURCE_COLLECTION, resourceList);
    }
    setTagList(tagList: Array<ITag>) {
        this._store.set(Store.TAG_COLLECTION, tagList);
    }
    /*
    addTag(tag: ITag) {
        const tagList: Array<ITag> = this._store.get(Store.TAG_COLLECTION, []);
        tagList.push(tag);
        this._store.set(Store.RESOURCE_COLLECTION, tagList);
    }

 */
}
