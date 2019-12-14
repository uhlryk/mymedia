import {BrowserWindow, dialog} from "electron";
import AppController from "./AppController";
import IpcProviderResourceEnums from "../shared/IpcProviderResourceEnums";
import Listener from "./core/Listener";
import Reply from "./core/Reply";
export default class AppManager {
    private _appController: AppController;
    private _triggerCreateProject: Reply;
    private _rendererProcess: BrowserWindow;
    constructor(rendererProcess: BrowserWindow) {
        this._rendererProcess = rendererProcess;
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
    }

    public triggetCreateProject() {
        this._rendererProcess.webContents.send(IpcProviderResourceEnums.TRIGGER_SET_PROJECT);
    }
    public triggetTagsManager() {
        this._rendererProcess.webContents.send(IpcProviderResourceEnums.TRIGGER_TAGS_MANAGER);
    }
}
