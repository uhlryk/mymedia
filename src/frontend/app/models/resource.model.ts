import ResourceModelInterface from "../../../shared/types/resourceModel.interface";
import TagCollectionModel from "./tag.collection.model";
import TagModel from "./tag.model";

export default class ResourceModel {
    private _filePath: string;
    private _fileName: string;
    private _size: number;
    private _width: number;
    private _height: number;
    private _duration: number;
    private _ranking: number;
    private _title: string;
    private _id: string;
    private _description: string;

    private _isNew: boolean;
    private _isRemoved: boolean;

    private _tagModelList: Array<TagModel> = [];
    private _tagCollectionModel: TagCollectionModel;
    private _thumbnailList: Array<string>;
    static fromProject(
        resource: ResourceModelInterface,
        tagCollectionModel: TagCollectionModel
    ) {
        const resourceModel: ResourceModel = new ResourceModel(tagCollectionModel);
        resourceModel._id = resource.id;
        resourceModel._filePath = resource.filePath;
        resourceModel._fileName = resource.filePath;
        resourceModel._size = resource.size;
        resourceModel._duration = resource.duration;
        resourceModel._width = resource.width;
        resourceModel._height = resource.height;
        resourceModel._ranking = resource.ranking;
        resourceModel._title = resource.title;
        resourceModel._description = resource.description;
        resourceModel._isNew = resource.isNew;
        resourceModel._thumbnailList = resource.thumbnailList || [];
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

    public get thumbnailPath() {
        return this._thumbnailList[0];
    }

    public setThumbnailPath(value: string, index: number) {
        this._thumbnailList[index] = value;
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

    get duration() {
        return this._duration;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
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

    public toSaveValue(): ResourceModelInterface {
        return {
            filePath: this._filePath,
            fileName: this._fileName,
            title: this._title,
            size: this._size,
            duration: this._duration,
            width: this._width,
            height: this._height,
            ranking: this._ranking,
            description: this._description,
            id: this._id,
            isRemoved: this._isRemoved,
            isNew: this._isNew,
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
