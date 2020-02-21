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
    addResource(resource: IResource) {
        const resourceList: Array<IResource> = this._store.get(
            Store.RESOURCE_COLLECTION,
            []
        );
        resourceList.push(resource);
        this._store.set(Store.RESOURCE_COLLECTION, resourceList);
    }
    getResource(id: string): IResource {
        return this.getResourceList().find((resource: IResource) => resource.id === id);
    }
    getResourceByPath(filePath: string): IResource {
        return this.getResourceList().find(
            (resource: IResource) => resource.filePath === filePath
        );
    }
    getResourceList(): Array<IResource> {
        return this._store.get(Store.RESOURCE_COLLECTION, []);
    }
    addTag(tag: ITag) {
        const tagList: Array<ITag> = this._store.get(Store.TAG_COLLECTION, []);
        tagList.push(tag);
        this._store.set(Store.RESOURCE_COLLECTION, tagList);
    }
    getTagList(): Array<ITag> {
        return this._store.get(Store.TAG_COLLECTION, []);
    }
}
