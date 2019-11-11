import ResourceModel from "./resource.model";
import ResourceModelInterface from "../../../shared/types/resourceModel.interface";
import TagCollectionModel from "./tag.collection.model";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
export default class ResourceCollectionModel {
    private _resourceModelList: Array<ResourceModel>;
    private _tagCollectionModel: TagCollectionModel;
    public constructor(resourceList: Array<ResourceModelInterface>, tagCollectionModel: TagCollectionModel) {
        this._tagCollectionModel = tagCollectionModel;
        this._resourceModelList = resourceList.map(
            (resource: ResourceModelInterface) => {
                return ResourceModel.fromProject(resource, tagCollectionModel);
            }
        );
    }

    public addResourceModel(resourceModel: ResourceModel) {
        this._resourceModelList.push(resourceModel);
    }

    public getResourceModelByPath(filePath: string): ResourceModel {
        return this._resourceModelList.find(
            (resourceModel: ResourceModel) => resourceModel.getFilePath() === filePath
        );
    }
    public getResourceModelById(id: string): ResourceModel {
        return this._resourceModelList.find(
            (resourceModel: ResourceModel) => resourceModel.getId() === id
        );
    }

    public removeResourceTagModel(resourceId, tagId) {
        this.getResourceModelById(resourceId).removeTagModel(tagId);
    }

    public removeAllResourceTagModel(tagId) {
        return this._resourceModelList.forEach(resourceModel => {
            resourceModel.removeTagModel(tagId);
        });
    }

    public toSaveValue(): Array<ResourceModelInterface> {
        return this._resourceModelList.map((resourceModel: ResourceModel) =>
            resourceModel.toSaveValue()
        );
    }

    public getList(): Array<ResourceModel> {
        return this._resourceModelList;
    }
}
