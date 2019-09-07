import * as path from "path";

const { shell } = (<any>window).require("electron");
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FileService {
    constructor() {}

    open(projectPath, filePath) {
        shell.openItem(path.join(projectPath, filePath));
    }

    getFileName(filePath) {
        return path.parse(filePath).name;
    }
}
