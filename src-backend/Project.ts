import { ipcMain } from "electron";
export default class Project {
    _projectPath: string;
    constructor() {
        ipcMain.on(
            "project/set",
            (event, responseChannel: string, projectPath: string) => {
                console.log("Set Project ", projectPath);
                this._projectPath = projectPath;
                event.reply(responseChannel);
            }
        );

        ipcMain.on("project/get", (event, responseChannel: string) => {
            console.log("Get Project ", this._projectPath);
            event.reply(responseChannel, this._projectPath);
        });
    }
}
