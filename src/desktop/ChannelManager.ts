import { ipcMain } from "electron";
import ProjectInterface from "../shared/types/project.interface";
import loadFile from "./fs/loadFile";
import saveFile from "./fs/saveFile";
export default class ChannelManager {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";
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

        ipcMain.on(
            "project/save",
            async (event, responseChannel: string, project: ProjectInterface) => {
                await saveFile(
                    this.getProjectPath(),
                    ChannelManager.PROJECT_FOLDER,
                    ChannelManager.PROJECT_FILE_NAME,
                    JSON.stringify(project)
                );
                event.reply(responseChannel);
            }
        );

        ipcMain.on("project/load", async (event, responseChannel: string) => {
            console.log("Y1");
            const projectFileString = await loadFile(
                this.getProjectPath(),
                ChannelManager.PROJECT_FOLDER,
                ChannelManager.PROJECT_FILE_NAME
            );
            const projectFile: ProjectInterface = JSON.parse(projectFileString);
            console.log("Y2");
            event.reply(responseChannel,  projectFile);
            console.log("Y3");
        });
    }

    private getProjectPath(): string {
        return this._projectPath;
    }
}
