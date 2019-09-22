import TagInterface from "./tag.interface";
import TagModel from "./tag.model";

export default class TagCollectionModel {
    private _tagModelList: Array<TagModel> = [];
    public constructor() {}
    static fromProject(tagList: Array<TagInterface> = []): TagCollectionModel {
        const tagCollectionModel = new TagCollectionModel();

        tagCollectionModel._tagModelList = tagList.map((tag: TagInterface) => {
            return TagModel.fromProject(tag);
        });
        return tagCollectionModel;
    }

    public getTagModelByName(name: string): TagModel {
        return this._tagModelList.find(
            (tagModel: TagModel) => tagModel.getName() === name
        );
    }
    public getTagModelById(id: string): TagModel {
        return this._tagModelList.find((tagModel: TagModel) => tagModel.getId() === id);
    }

    public addTagModel(tagModel: TagModel) {
        this._tagModelList.push(tagModel);
    }

    public toSaveValue(): Array<TagInterface> {
        return this._tagModelList.map((tagModel: TagModel) => tagModel.toSaveValue());
    }

    public getList(): Array<TagModel> {
        return this._tagModelList;
    }
}
