import uuid from "uuidv4";

export default class Tag {
    id: string;
    name: string;
    constructor(name) {
        this.id = uuid();
        this.name = name;
    }
}
