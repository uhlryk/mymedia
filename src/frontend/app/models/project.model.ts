import getFileList from "./helpers/getFileList";
import TagCollectionModel from "./tag.collection.model";
import ProjectInterface from "../../../shared/types/project.interface";
import ResourceCollectionModel from "./resource.collection.model";
import FileInterface from "../../../shared/types/file.interface";
import * as path from "path";
import TagModel from "./tag.model";
import ResourceModel from "./resource.model";
import IpcProvider from "../providers/ipc.provider";

export default class ProjectModel {
    private _tagCollectionModel: TagCollectionModel;
    private _resourceCollectionModel: ResourceCollectionModel;
    public async setProjectPath(projectFolderPath: string) {
        await IpcProvider.request("project/set", projectFolderPath);
    }
    public async getProjectPath(): Promise<string> {
        return await IpcProvider.request("project/get");
    }
    private async loadFiles(): Promise<Array<FileInterface>> {
        const projectPath = await this.getProjectPath();
        return getFileList(projectPath);
    }

    private async loadProjectFile(): Promise<ProjectInterface> {
        const project: ProjectInterface = await IpcProvider.request("project/load");
        console.log(project);
        return project;
    }

    public async loadProject(): Promise<boolean> {
        const project: ProjectInterface = await this.loadProjectFile();
        if (project) {
            this._tagCollectionModel = TagCollectionModel.fromProject(project.tagList);
            this._resourceCollectionModel = ResourceCollectionModel.fromProject(
                project.resourceList,
                this._tagCollectionModel
            );
            await this.sync();
            await this.save();
            return true;
        } else {
            return false;
        }
    }

    public async createProject(createSubFolderTags: boolean): Promise<void> {
        this._tagCollectionModel = new TagCollectionModel();
        this._resourceCollectionModel = new ResourceCollectionModel(
            this._tagCollectionModel
        );
        const fileList: Array<FileInterface> = await this.loadFiles();

        fileList.forEach((file: FileInterface) => {
            const folderPath: string = path.dirname(file.filePath);
            const resourceModel: ResourceModel = ResourceModel.fromFile(
                file,
                this._tagCollectionModel
            );
            this._resourceCollectionModel.addResourceModel(resourceModel);
            if (createSubFolderTags) {
                if (folderPath !== ".") {
                    let tagModel = this._tagCollectionModel.getTagModelByName(folderPath);
                    if (!tagModel) {
                        tagModel = TagModel.create(folderPath);
                        this._tagCollectionModel.addTagModel(tagModel);
                    }
                    resourceModel.addTagModel(tagModel);
                }
            }
        });
        await this.save();
    }

    public async sync() {
        const fileList: Array<FileInterface> = await this.loadFiles();
        this._resourceCollectionModel.sync(fileList);
    }

    public async save() {
        const project: ProjectInterface = {
            resourceList: this._resourceCollectionModel.toSaveValue(),
            tagList: this._tagCollectionModel.toSaveValue()
        };
        return await IpcProvider.request("project/save", project);
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
        IpcProvider.trigger("resource/open", resourceModel.getFilePath());
    }
}
