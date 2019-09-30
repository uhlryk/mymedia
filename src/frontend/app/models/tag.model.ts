import uuid from "uuidv4";
import TagInterface from "./tag.interface";

export default class TagModel {
    private _id: string;
    private _name: string;
    private constructor() {}

    static fromProject(tag: TagInterface): TagModel {
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

    public getName(): string {
        return this._name;
    }

    public setName(name: string) {
        this._name = name;
    }
    public getId(): string {
        return this._id;
    }

    public toSaveValue(): TagInterface {
        return {
            id: this._id,
            name: this._name
        };
    }
}
