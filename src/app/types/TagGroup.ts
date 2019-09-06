import uuid from "uuidv4";

export default class TagGroup {
    id: string;
    name: string;
    constructor() {
        this.id = uuid();
    }
}
