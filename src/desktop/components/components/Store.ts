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
        let resourceList: Array<IResource> = this.getResourceList();
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
        let resourceList: Array<IResource> = this.getResourceList();
        resourceList = resourceList.filter(existingResource => {
            return existingResource.id !== resourceId;
        });
        this._store.set(Store.RESOURCE_COLLECTION, resourceList);
    }
    setTagList(tagList: Array<ITag>) {
        this._store.set(Store.TAG_COLLECTION, tagList);
    }
    removeTag(tagId: string) {
        const resourceList = this.getResourceList().map((resource: IResource) => {
            resource.tagIdList = resource.tagIdList.filter(
                existingTagId => existingTagId !== tagId
            );
            return resource;
        });
        this.setResourceList(resourceList);
        let tagList: Array<ITag> = this.getTagList();
        tagList = tagList.filter(existingTag => {
            return existingTag.id !== tagId;
        });
        this._store.set(Store.TAG_COLLECTION, tagList);
    }
}
