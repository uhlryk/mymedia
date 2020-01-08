import IProject from "../shared/types/project.interface";
import loadFile from "./fs/loadFile";
import ProjectFileInterface from "./types/projectFile.interface";
import getFileList from "./fs/getFileList";
import FileInterface from "./types/file.interface";
import ResourceFileInterface from "./types/resourceFile.interface";
import uuid from "uuidv4";
import getMetadata from "./fs/getMetadata";
import * as path from "path";
import IResource from "../shared/types/resource.interface";
import ThumbnailManager from "./modules/thumbnails/ThumbnailManager";
import saveProjectFile from "./fs/saveProjectFile";
import Loader from "./core/Loader";

export default class ProjectManager {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";

    _projectPath: string;
    _projectFolderPath: string;
    _projectModel: IProject;
    _isDestroyed: boolean = false;
    private _thumbnailManager: ThumbnailManager;
    constructor(projectPath: string) {
        this._projectPath = projectPath;
        this._projectFolderPath = path.resolve(
            this._projectPath,
            ProjectManager.PROJECT_FOLDER
        );
        this._thumbnailManager = new ThumbnailManager(
            this._projectPath,
            ProjectManager.PROJECT_FOLDER
        );
    }

    destroy() {
        this._isDestroyed = true;
        if (this._thumbnailManager) {
            this._thumbnailManager.destroy();
        }
    }
    public async loadProjectModel(loader: Loader): Promise<IProject> {
        loader.setMessage("Load project");
        const projectFile: ProjectFileInterface = await loadProjectFile(
            this._projectFolderPath,
            ProjectManager.PROJECT_FILE_NAME
        );
        loader.setMessage("Load project files");
        this._projectModel = await this.generateProjectModel(projectFile, loader);
        await this.mapThumbnails();
        return this._projectModel;
    }

    public listenForThumbnails(
        listener: (
            resourceId: string,
            resourceThumbnailPath: string,
            index: number
        ) => void
    ) {
        // this._thumbnailManager.run(listener);
        this._thumbnailManager.execute(listener);
    }
    private async mapThumbnails() {
        const thumbnailMap: Map<
            string,
            Array<string>
        > = await this._thumbnailManager.loadExistingThumbnails();
        this._projectModel.resourceList.map((resourceModel: IResource) => {
            if (thumbnailMap.has(resourceModel.id)) {
                const thumbnailList: Array<string> = thumbnailMap.get(resourceModel.id);
                this._thumbnailManager.queueGenerateMissingThumbnails(
                    resourceModel,
                    thumbnailList
                );
                resourceModel.thumbnailList = thumbnailList;
            } else {
                this._thumbnailManager.queueGenerateAllThumbnails(resourceModel);
            }
        });
    }
    private async generateProjectModel(
        projectFile: ProjectFileInterface,
        loader: Loader
    ): Promise<IProject> {
        const fileList: Array<FileInterface> = await getFileList(this._projectPath);
        const projectModel: IProject = createModelFromProjectFile(
            projectFile
        );
        loader.setProgress(0);
        await asyncForEach(fileList, async (file: FileInterface, index: number) => {
            loader.setProgress(Math.ceil(((index + 1) * 100) / fileList.length));
            const resource: IResource = getResourceByPath(
                projectModel.resourceList,
                file.filePath
            );
            if (resource) {
                resource.isRemoved = false;
            } else {
                const newResource = await createResourceModel(
                    this._projectPath,
                    ProjectManager.PROJECT_FOLDER,
                    file
                );
                projectModel.resourceList.push(newResource);
            }
        });
        loader.setProgress(100);
        return projectModel;
    }

    public setProjectModel(projectModel: IProject) {
        this._projectModel = projectModel;
    }
    public async save() {
        const projectFile: ProjectFileInterface = {
            resourceList: this._projectModel.resourceList.map(
                (resourceModel: IResource): ResourceFileInterface => {
                    return resourceModel as ResourceFileInterface;
                }
            ),
            tagList: this._projectModel.tagList
        };
        await saveProjectFile(
            this._projectFolderPath,
            ProjectManager.PROJECT_FILE_NAME,
            JSON.stringify(projectFile)
        );
    }
}

async function loadProjectFile(
    projectFolderPath: string,
    projectFileName: string
): Promise<ProjectFileInterface> {
    const projectFileString = await loadFile(projectFolderPath, projectFileName);
    return JSON.parse(projectFileString);
}

function createModelFromProjectFile(
    projectFile: ProjectFileInterface
): IProject {
    const projectModel: IProject = {
        resourceList: [],
        tagList: projectFile.tagList
    };
    projectModel.resourceList = projectFile.resourceList.map(
        (fileResource: ResourceFileInterface): IResource => {
            return Object.assign({}, fileResource, {
                isRemoved: true,
                isNew: false
            }) as IResource;
        }
    );
    return projectModel;
}

function getResourceByPath(
    resourceList: Array<IResource>,
    filePath: string
): IResource {
    return resourceList.find(
        (resource: IResource) => resource.filePath === filePath
    );
}

async function createResourceModel(
    projectPath: string,
    projectFoldeName: string,
    file: FileInterface
): Promise<IResource> {
    const id = uuid();
    const metadata = await getMetadata(path.resolve(projectPath, file.filePath));
    const resource: IResource = {
        filePath: file.filePath,
        fileName: file.fileName,
        title: file.name,
        size: file.size,
        duration: parseInt(metadata.duration, 10),
        width: parseInt(metadata.width, 10),
        height: parseInt(metadata.height, 10),
        ranking: 0,
        description: "",
        id: id,
        tags: [],
        isRemoved: false,
        isNew: true
    };
    return resource;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
