import ResourceModel from "./resource.model";
import ResourceModelInterface from "../../../shared/types/resourceModel.interface";
import TagCollectionModel from "./tag.collection.model";
export default class ResourceCollectionModel {
    private _resourceModelList: Array<ResourceModel>;
    private _tagCollectionModel: TagCollectionModel;
    public constructor(
        resourceList: Array<ResourceModelInterface>,
        tagCollectionModel: TagCollectionModel
    ) {
        this._tagCollectionModel = tagCollectionModel;
        this._resourceModelList = resourceList.map((resource: ResourceModelInterface) => {
            return ResourceModel.fromProject(resource, tagCollectionModel);
        });
    }

    public getResourceModelById(id: string): ResourceModel {
        return this._resourceModelList.find(
            (resourceModel: ResourceModel) => resourceModel.getId() === id
        );
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
        return this._resourceModelList.slice();
    }
}
