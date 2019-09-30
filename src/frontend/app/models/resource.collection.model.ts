import ResourceModel from "./resource.model";
import ResourceInterface from "../../../shared/types/resource.interface";
import TagCollectionModel from "./tag.collection.model";
import FileInterface from "../../../shared/types/file.interface";

export default class ResourceCollectionModel {
    private _resourceModelList: Array<ResourceModel> = [];
    private _tagCollectionModel: TagCollectionModel;
    public constructor(tagCollectionModel: TagCollectionModel) {
        this._tagCollectionModel = tagCollectionModel;
    }
    static fromProject(
        resourceList: Array<ResourceInterface>,
        tagCollectionModel: TagCollectionModel
    ): ResourceCollectionModel {
        const resourceCollectionModel = new ResourceCollectionModel(tagCollectionModel);

        resourceCollectionModel._resourceModelList = resourceList.map(
            (resource: ResourceInterface) => {
                return ResourceModel.fromProject(resource, tagCollectionModel);
            }
        );
        return resourceCollectionModel;
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

    public sync(fileList: Array<FileInterface>) {
        fileList.forEach((file: FileInterface) => {
            if (!this.getResourceModelByPath(file.filePath)) {
                const newResourceModel = ResourceModel.fromFile(
                    file,
                    this._tagCollectionModel
                );
                newResourceModel.setAsNew();
                this._resourceModelList.push(newResourceModel);
            }
        });
    }

    public removeResourceTagModel(resourceId, tagId) {
        this.getResourceModelById(resourceId).removeTagModel(tagId);
    }

    public removeAllResourceTagModel(tagId) {
        return this._resourceModelList.forEach(resourceModel => {
            resourceModel.removeTagModel(tagId);
        });
    }

    public toSaveValue(): Array<ResourceInterface> {
        return this._resourceModelList.map((resourceModel: ResourceModel) =>
            resourceModel.toSaveValue()
        );
    }

    public getList(): Array<ResourceModel> {
        return this._resourceModelList;
    }
}
