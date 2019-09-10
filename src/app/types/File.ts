import uuid from "uuidv4";

export default class File {
    filePath: string;
    orgFileName: string;
    newFileName: string = "";
    size = 0;
    id: string;
    tags: string[] = [];
    constructor() {
        this.id = uuid();
    }


}
