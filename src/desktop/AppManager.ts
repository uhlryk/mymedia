import { dialog } from "electron";
import AppController from "./AppController";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
import Listener from "./core/Listener";
export default class AppManager {
    private _appController: AppController;
    constructor() {
        this.registerListener();
    }

    private registerListener() {
        Listener.on(IpcProviderResourceEnums.SET_PROJECT, context => {
            context.loader.setMessage("Waiting for project path");
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
                    context.loader.setMessage("Checking if project exist");
                    const isProjectExist = await this._appController.testProjectPath();

                    context.reply.send(isProjectExist);
                }
            );
        });

        Listener.on(IpcProviderResourceEnums.LISTEN_SET_PROJECT, context => {});
    }

    public triggetCreateProject() {}
}
