import uuid from "uuidv4";
import ResourceInterface from "./resource.interface";
import FileInterface from "./file.interface";
import TagCollectionModel from "./tag.collection.model";
import getFileName from "./helpers/getFileName";
import TagModel from "./tag.model";

export default class ResourceModel {
    private _filePath: string;
    private _fileName: string;
    private _size: number;
    private _ranking: number;
    private _title: string;
    private _id: string;
    private _description: string;

    private _isNew: boolean;
    private _isDeleted: boolean;

    private _tagModelList: Array<TagModel> = [];
    private _tagCollectionModel: TagCollectionModel;
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
        resource.tags.forEach((tagId: string) => {
            const tagModel = tagCollectionModel.getTagModelById(tagId);
            resourceModel.addTagModel(tagModel);
        });
        return resourceModel;
    }
    static fromFile(
        file: FileInterface,
        tagCollectionModel: TagCollectionModel
    ): ResourceModel {
        const resourceModel: ResourceModel = new ResourceModel(tagCollectionModel);
        resourceModel._id = uuid();
        resourceModel._filePath = file.filePath;
        resourceModel._fileName = file.name;
        resourceModel._size = file.size;
        resourceModel._ranking = 0;
        resourceModel._title = getFileName(file.name);
        return resourceModel;
    }

    private constructor(tagCollectionModel: TagCollectionModel) {
        this._tagCollectionModel = tagCollectionModel;
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

    getDescription() {
        return this._description;
    }
    setAsNew() {
        this._isNew = true;
    }

    setAsDeleted() {
        this._isDeleted = true;
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
            tags: this._tagModelList.map((tagModel: TagModel) => tagModel.getId())
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
