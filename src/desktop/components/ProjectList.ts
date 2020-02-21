import { BrowserWindow, dialog } from "electron";
// import AppController from "./AppController";
import IpcProviderResourceEnums from "../../shared/IpcProviderResourceEnums";
import Listener from "../core/Listener";
import Project from "./Project";
import { IProjectListElement } from "../../shared/types/project-list.interface";
import uuidv4 from "uuidv4";
import * as path from "path";
const Store = require("electron-store");
// import * as Store from "electron-store";
console.log(Store);
export default class ProjectList {
    private store;
    constructor() {
        this.store = new Store({
            schema: {
                projects: {
                    list: []
                }
            }
        });
        this.registerListener();
    }

    private registerListener() {
        Listener.on(IpcProviderResourceEnums.GET_PROJECT_LIST, context => {
            context.reply.send(this.store.get("projects.list"));
        });
        Listener.on(
            IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_FILEPICKER,
            context => {
                context.loader.setMessage("Waiting for project path");
                dialog.showOpenDialog(
                    {
                        properties: ["openDirectory"]
                    },
                    async fileNames => {
                        const resourceFolderPath = fileNames[0];
                        context.loader.setMessage("Checking if project exist");
                        const projectList = this.store.get("projects.list");
                        const project: IProjectListElement = {
                            id: uuidv4(),
                            name: path.parse(resourceFolderPath).name,
                            resourceFolderPath: resourceFolderPath
                        };
                        projectList.push(project);
                        this.store.set("projects.list", projectList);
                        await Project.getNewProjectInstance(resourceFolderPath);
                        context.reply.send();
                    }
                );
            }
        );
        Listener.on(
            IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_LIST,
            async context => {
                context.loader.setMessage("Waiting for project path");
                const id: string = context.data.id;
                const projectList: Array<IProjectListElement> = this.store.get(
                    "projects.list"
                );
                const projectListElement = projectList.find(project => project.id === id);
                await Project.getNewProjectInstance(
                    projectListElement.resourceFolderPath
                );
                context.reply.send();
            }
        );

        Listener.on(IpcProviderResourceEnums.REMOVE_PROJECT_FROM_LIST, async context => {
            const id: string = context.data.id;
            let projectList: Array<IProjectListElement> = this.store.get("projects.list");
            projectList = projectList.filter(project => project.id !== id);
            this.store.set("projects.list", projectList);
            context.reply.send();
        });
    }
}
