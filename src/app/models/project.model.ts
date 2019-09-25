import loadFile from "./helpers/loadFile";
import getFileList from "./helpers/getFileList";
import TagCollectionModel from "./tag.collection.model";
import ProjectInterface from "./project.interface";
import ResourceCollectionModel from "./resource.collection.model";
import FileInterface from "./file.interface";
import * as path from "path";
import TagModel from "./tag.model";
import ResourceModel from "./resource.model";
import fileSave from "./helpers/fileSave";
import fileOpen from "./helpers/fileOpen";

export default class ProjectModel {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";

    private projectFolderPath: string;

    private _tagCollectionModel: TagCollectionModel;
    private _resourceCollectionModel: ResourceCollectionModel;
    constructor(projectFolderPath: string) {
        this.projectFolderPath = projectFolderPath;
    }

    public getProjectPath() {
        return this.projectFolderPath;
    }
    private async loadFiles(): Promise<Array<FileInterface>> {
        return getFileList(this.projectFolderPath);
    }

    private async loadProjectFile(): Promise<ProjectInterface> {
        const projectFile = await loadFile(
            this.projectFolderPath,
            ProjectModel.PROJECT_FOLDER,
            ProjectModel.PROJECT_FILE_NAME
        );
        return JSON.parse(projectFile);
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
        await fileSave(
            this.projectFolderPath,
            ProjectModel.PROJECT_FOLDER,
            ProjectModel.PROJECT_FILE_NAME,
            JSON.stringify(project)
        );
    }

    public getResourceCollectionModel(): ResourceCollectionModel {
        return this._resourceCollectionModel;
    }

    public getTagCollectionModel(): TagCollectionModel {
        return this._tagCollectionModel;
    }

    public open(resourceId: string) {
        const resourceModel: ResourceModel = this._resourceCollectionModel.getResourceModelById(
            resourceId
        );
        fileOpen(this.projectFolderPath, resourceModel.getFilePath());
    }
}
