import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import ResourceInterface from "../../../shared/types/resource.interface";
import TagCollectionModel from "./tag.collection.model";
import TagModel from "./tag.model";
import IpcProvider from "../providers/ipc.provider";

export default class ResourceModel {
    private _filePath: string;
    private _fileName: string;
    private _size: number;
    private _ranking: number;
    private _title: string;
    private _id: string;
    private _description: string;

    private _isNew: boolean;
    private _isRemoved: boolean;

    private _tagModelList: Array<TagModel> = [];
    private _tagCollectionModel: TagCollectionModel;
    private _thumbnailPath: string;
    static fromProject(
        resource: ResourceInterface,
        tagCollectionModel: TagCollectionModel
    ) {
        const resourceModel: ResourceModel = new ResourceModel(tagCollectionModel);
        resourceModel._id = resource.id;
        resourceModel._filePath = resource.filePath;
        resourceModel._fileName = resource.filePath;
        resourceModel._size = resource.size;
        resourceModel._ranking = resource.ranking;
        resourceModel._title = resource.title;
        resourceModel._description = resource.description;
        resourceModel._isNew = resource.isNew;
        resourceModel._thumbnailPath = resource.thumbnailPath;
        resourceModel._isRemoved = resource.isRemoved;
        resource.tags.forEach((tagId: string) => {
            const tagModel = tagCollectionModel.getTagModelById(tagId);
            resourceModel.addTagModel(tagModel);
        });
        return resourceModel;
    }

    private constructor(tagCollectionModel: TagCollectionModel) {
        this._tagCollectionModel = tagCollectionModel;
    }

    getThumbnail() {
        return this._thumbnailPath;
    }
    getFilePath() {
        return this._filePath;
    }

    getFileName() {
        return this._fileName;
    }

    getId() {
        return this._id;
    }

    getSize() {
        return this._size;
    }

    getTitle() {
        return this._title;
    }

    isNew() {
        return this._isNew;
    }

    isRemoved() {
        return this._isRemoved;
    }
    getDescription() {
        return this._description;
    }

    getRanking(): number {
        return this._ranking;
    }

    public setRanking(ranking) {
        this._ranking = ranking;
    }

    public setTitle(title: string) {
        this._title = title;
    }
    public setDescription(description: string) {
        this._description = description;
    }
    public addTagModel(newTagModel: TagModel) {
        const existingTagModel = this._tagModelList.find(
            (tagModel: TagModel) => tagModel.getId() === newTagModel.getId()
        );
        if (!existingTagModel) {
            this._tagModelList.push(newTagModel);
        }
    }

    public removeTagModel(tagId: string) {
        const tagIndex = this._tagModelList.findIndex(
            (tagModel: TagModel) => tagModel.getId() === tagId
        );
        if (tagIndex >= 0) {
            this._tagModelList.splice(tagIndex, 1);
        }
    }

    public toSaveValue(): ResourceInterface {
        return {
            filePath: this._filePath,
            fileName: this._fileName,
            title: this._title,
            size: this._size,
            ranking: this._ranking,
            description: this._description,
            id: this._id,
            isRemoved: this._isRemoved,
            isNew: this._isNew,
            tags: this._tagModelList.map((tagModel: TagModel) => tagModel.getId()),
            thumbnailPath: this._thumbnailPath
        };
    }

    public getResourceTagModelList(): Array<TagModel> {
        return this._tagModelList;
    }

    /**
     * returns tags not included in this resource
     */
    public getOtherProjectTagModelList(): Array<TagModel> {
        return this._tagCollectionModel
            .getList()
            .filter(
                (projectTagModel: TagModel) =>
                    !this._tagModelList.find(
                        (resourceTagModel: TagModel) =>
                            projectTagModel.getId() === resourceTagModel.getId()
                    )
            );
    }
}
