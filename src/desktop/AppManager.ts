import { ipcMain, dialog } from "electron";
import ProjectManager from "./ProjectManager";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
export default class AppManager {
    private _projectManager: ProjectManager;
    constructor() {
        ipcMain.on(
            IpcProviderResourceEnums.SET_PROJECT,
            (event, responseChannel: string) => {
                event.reply(
                    IpcProviderResourceEnums.SET_LOADER_MESSAGE,
                    "Waiting for project path"
                );
                dialog.showOpenDialog(
                    {
                        properties: ["openDirectory"]
                    },
                    async fileNames => {
                        const projectPath = fileNames[0];
                        this._projectManager = new ProjectManager(projectPath);
                        event.reply(
                            IpcProviderResourceEnums.SET_LOADER_MESSAGE,
                            "Checking if project exist"
                        );
                        const isProjectExist = await this._projectManager.testProjectPath();
                        event.reply(responseChannel, isProjectExist);
                    }
                );
            }
        );
    }
}
