import { IProjectListElement } from "../../shared/types/project-list.interface";
const ElectronStore = require("electron-store");
export default class Store {
    static COLLECTION = "projects";
    private _store;

    constructor() {
        this._store = new ElectronStore({
            schema: {
                [Store.COLLECTION]: {
                    type: "array"
                }
            }
        });
    }

    getProject(id: string): IProjectListElement {
        return this.getProjectList().find(project => project.id === id);
    }

    getProjectList(): Array<IProjectListElement> {
        return this._store.get(Store.COLLECTION, []);
    }

    addProject(project: IProjectListElement): void {
        const projectList: Array<IProjectListElement> = this._store.get(Store.COLLECTION, []);
        projectList.push(project);
        this._store.set(Store.COLLECTION, projectList);
    }

    removeProject(projectId: string): void {
        let projectList: Array<IProjectListElement> = this._store.get(Store.COLLECTION, []);
        projectList = projectList.filter(project => project.id !== projectId);
        this._store.set(Store.COLLECTION, projectList);
    }
}
