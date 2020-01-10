import uuid from "uuidv4";
import ITag from "../../../shared/types/tag.interface";

export default class TagModel {
    private _id: string;
    private _name: string;
    private constructor() {}

    static fromProject(tag: ITag): TagModel {
        const tagModel = new TagModel();
        tagModel._id = tag.id;
        tagModel._name = tag.name;
        return tagModel;
    }

    static create(name: string): TagModel {
        const tagModel = new TagModel();
        tagModel._id = uuid();
        tagModel._name = name;
        return tagModel;
    }

    public get name(): string {
        return this._name;
    }

    public setName(name: string) {
        this._name = name;
    }
    public get id(): string {
        return this._id;
    }

    public toSaveValue(): ITag {
        return {
            id: this._id,
            name: this._name
        };
    }
}
