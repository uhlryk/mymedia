import { BrowserWindow, dialog } from "electron";
// import AppController from "./AppController";
import IpcProviderResourceEnums from "../../shared/IpcProviderResourceEnums";
import Listener from "../core/Listener";
import Project from "./Project";
const Store = require("electron-store");
// import * as Store from "electron-store";
console.log(Store);
export default class ProjectList {
    private store;
    constructor() {
        this.store = new Store({
            schema: {
                projects: { list: [] }
            }
        });
        this.registerListener();
    }

    private registerListener() {
        Listener.on(IpcProviderResourceEnums.GET_PROJECT_LIST, context => {
            context.reply.send(this.store.get("projects.list"));
        });
        Listener.on(IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_FILEPICKER, context => {
            context.loader.setMessage("Waiting for project path");
            dialog.showOpenDialog(
                {
                    properties: ["openDirectory"]
                },
                async fileNames => {
                    const resourceFolderPath = fileNames[0];
                    context.loader.setMessage("Checking if project exist");
                    const projectList = this.store.get("projects.list");
                    projectList.push(resourceFolderPath);
                    this.store.set("projects.list", projectList);
                    await Project.getNewProjectInstance(resourceFolderPath);
                    context.reply.send();
                }
            );
        });
        Listener.on(IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_LIST, async context => {
            context.loader.setMessage("Waiting for project path");
            const resourceFolderPath: string = context.data.projectPath;
            await Project.getNewProjectInstance(resourceFolderPath);
            context.reply.send();
        });

        Listener.on(IpcProviderResourceEnums.REMOVE_PROJECT_FROM_LIST, async context => {
            // context.loader.setMessage("Waiting for project path");
            const resourceFolderPath: string = context.data.projectPath;
            let projectList = this.store.get("projects.list");
            projectList = projectList.filter(projectPath => projectPath !== resourceFolderPath);
            this.store.set("projects.list", projectList);
            context.reply.send();
        });
    }
}
