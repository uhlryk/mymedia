import uuid from "uuidv4";

export default class File {
    filePath: string;
    orgFileName: string;
    newFileName: string = "";
    id: string;
    tags: string[] = [];
    constructor() {
        this.id = uuid();
    }


}
