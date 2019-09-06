import uuid from "uuidv4";

export default class Tag {
    id: string;
    name: string;
    tagGroupId: string;
    constructor() {
        this.id = uuid();
    }
}
