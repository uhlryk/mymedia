import * as path from "path";

const { shell } = (<any>window).require("electron");

export default function fileOpen(projectPath, filePath) {
    shell.openItem(path.join(projectPath, filePath));
}
