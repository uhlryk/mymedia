import { ipcMain, dialog } from "electron";
import AppController from "./AppController";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
import Loader from "./Loader";
export default class AppManager {
    private _appController: AppController;
    constructor() {
        this.registerListener();
    }

    private registerListener() {
        ipcMain.on(
            IpcProviderResourceEnums.SET_PROJECT,
            (event, responseChannel: string) => {
                const loader = new Loader(event);
                loader.setMessage("Waiting for project path");
                dialog.showOpenDialog(
                    {
                        properties: ["openDirectory"]
                    },
                    async fileNames => {
                        const projectPath = fileNames[0];
                        if (this._appController) {
                            this._appController.destroy();
                        }
                        this._appController = new AppController(projectPath);
                        loader.setMessage("Checking if project exist");
                        const isProjectExist = await this._appController.testProjectPath();
                        event.reply(responseChannel, isProjectExist);
                    }
                );
            }
        );

        ipcMain.on(
            IpcProviderResourceEnums.LISTEN_SET_PROJECT,
            (event, responseChannel: string) => {}
        );
    }

    public triggetCreateProject() {}
}
