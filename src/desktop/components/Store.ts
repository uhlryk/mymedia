import { IProjectListElement } from "../../shared/types/project-list.interface";
const ElectronStore = require("electron-store");
export default class Store {
    private _store;
    constructor() {
        this._store = new ElectronStore({
            schema: {
                projects: {
                    list: []
                }
            }
        });
    }

    getProject(id: string): IProjectListElement {
        return this.getProjectList().find(project => project.id === id);
    }

    getProjectList(): Array<IProjectListElement> {
        return this._store.get("projects.list");
    }

    addProject(project: IProjectListElement): void {
        const projectList: Array<IProjectListElement> = this._store.get("projects.list");
        projectList.push(project);
        this._store.set("projects.list", projectList);
    }

    removeProject(projectId: string): void {
        let projectList: Array<IProjectListElement> = this._store.get("projects.list");
        projectList = projectList.filter(project => project.id !== projectId);
        this._store.set("projects.list", projectList);
    }
}
