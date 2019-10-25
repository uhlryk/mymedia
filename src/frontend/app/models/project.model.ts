import TagCollectionModel from "./tag.collection.model";
import ProjectInterface from "../../../shared/types/project.interface";
import ResourceCollectionModel from "./resource.collection.model";
import FileInterface from "../../../shared/types/file.interface";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import * as path from "path";
import TagModel from "./tag.model";
import ResourceModel from "./resource.model";
import IpcProvider from "../providers/ipc.provider";

export default class ProjectModel {
    private static _instance;
    private _tagCollectionModel: TagCollectionModel;
    private _resourceCollectionModel: ResourceCollectionModel;

    static getInstance(): ProjectModel {
        if (!ProjectModel._instance) {
            ProjectModel._instance = new ProjectModel();
        }
        return ProjectModel._instance;
    }

    /**
     *  request electron to run dialog where user choose folder for project
     *
     * @returns false means that project doesn't exist in chosen path, true means that there is configured project
     */
    public async setProjectPath(): Promise<boolean> {
        return await IpcProvider.request(IpcProviderResourceEnums.SET_PROJECT);
    }
    public async getProjectPath(): Promise<string> {
        return await IpcProvider.request(IpcProviderResourceEnums.GET_PROJECT);
    }
    public async loadProject(): Promise<boolean> {
        const project: ProjectInterface = await IpcProvider.request(
            IpcProviderResourceEnums.LOAD_PROJECT
        );
        if (project) {
            this._tagCollectionModel = TagCollectionModel.fromProject(project.tagList);
            this._resourceCollectionModel = ResourceCollectionModel.fromProject(
                project.resourceList,
                this._tagCollectionModel
            );
            const fileList: Array<FileInterface> = await IpcProvider.request(
                IpcProviderResourceEnums.GET_LIST_RESOURCE
            );
            this._resourceCollectionModel.sync(fileList);
            await this.save();
            return true;
        } else {
            return false;
        }
    }

    public async createProject(): Promise<void> {
        return await IpcProvider.request(IpcProviderResourceEnums.CREATE_PROJECT);
    }

    public async save() {
        const project: ProjectInterface = {
            resourceList: this._resourceCollectionModel.toSaveValue(),
            tagList: this._tagCollectionModel.toSaveValue()
        };
        return await IpcProvider.request(IpcProviderResourceEnums.SAVE_PROJECT, project);
    }

    public getResourceCollectionModel(): ResourceCollectionModel {
        return this._resourceCollectionModel;
    }

    public getTagCollectionModel(): TagCollectionModel {
        return this._tagCollectionModel;
    }

    public async open(resourceId: string) {
        const resourceModel: ResourceModel = this._resourceCollectionModel.getResourceModelById(
            resourceId
        );
        IpcProvider.trigger(
            IpcProviderResourceEnums.EXECUTE_RESOURCE,
            resourceModel.getFilePath()
        );
    }
}
