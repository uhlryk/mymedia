import ProjectModelInterface from "../shared/types/projectModel.interface";
import loadFile from "./fs/loadFile";
import ProjectFileInterface from "../shared/types/projectFile.interface";
import getFileList from "./fs/getFileList";
import FileInterface from "../shared/types/file.interface";
import ResourceFileInterface from "../shared/types/resourceFile.interface";
import uuid from "uuidv4";
import getMetadata from "./fs/getMetadata";
import * as path from "path";
import ResourceModelInterface from "../shared/types/resourceModel.interface";
import ThumbnailManager from "./ThumbnailManager";
import saveProjectFile from "./fs/saveProjectFile";

export default class ProjectManager {
    static PROJECT_FOLDER = ".mymedia";
    static PROJECT_FILE_NAME = "project.json";

    _projectPath: string;
    _projectFolderPath: string;
    _projectModel: ProjectModelInterface;
    constructor(projectPath: string) {
        this._projectPath = projectPath;
        this._projectFolderPath = path.resolve(
            this._projectPath,
            ProjectManager.PROJECT_FOLDER
        );
    }
    public async loadProjectModel(): Promise<ProjectModelInterface> {
        const projectFile: ProjectFileInterface = await loadProjectFile(
            this._projectFolderPath,
            ProjectManager.PROJECT_FILE_NAME
        );
        return await this.generateProjectModel(projectFile);
    }

    private async generateProjectModel(
        projectFile: ProjectFileInterface
    ): Promise<ProjectModelInterface> {
        const fileList: Array<FileInterface> = await getFileList(this._projectPath);
        const projectModel: ProjectModelInterface = createModelFromProjectFile(
            projectFile
        );
        await asyncForEach(fileList, async (file: FileInterface, index: number) => {
            const resource: ResourceModelInterface = getResourceByPath(
                projectModel.resourceList,
                file.filePath
            );
            if (resource) {
                resource.isRemoved = false;
            } else {
                projectModel.resourceList.push(
                    await createResourceModel(
                        this._projectPath,
                        ProjectManager.PROJECT_FOLDER,
                        file
                    )
                );
            }
        });
        this._projectModel = projectModel;
        return this._projectModel;
    }

    public setProjectModel(projectModel: ProjectModelInterface) {
        this._projectModel = projectModel;
    }
    public async save() {
        const projectFile: ProjectFileInterface = {
            resourceList: this._projectModel.resourceList.map(
                (resourceModel: ResourceModelInterface): ResourceFileInterface => {
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
): ProjectModelInterface {
    const projectModel: ProjectModelInterface = {
        resourceList: [],
        tagList: projectFile.tagList
    };
    projectModel.resourceList = projectFile.resourceList.map(
        (fileResource: ResourceFileInterface): ResourceModelInterface => {
            return Object.assign({}, fileResource, {
                isRemoved: true,
                isNew: false
            }) as ResourceModelInterface;
        }
    );
    return projectModel;
}

function getResourceByPath(
    resourceList: Array<ResourceModelInterface>,
    filePath: string
): ResourceModelInterface {
    return resourceList.find(
        (resource: ResourceModelInterface) => resource.filePath === filePath
    );
}

async function createResourceModel(
    projectPath: string,
    projectFoldeName: string,
    file: FileInterface
): Promise<ResourceModelInterface> {
    const id = uuid();
    const metadata = await getMetadata(path.resolve(projectPath, file.filePath));

    const thumbnailPath = await ThumbnailManager.getThumbnail(
        projectPath,
        projectFoldeName,
        file.filePath,
        id
    );
    const resource: ResourceModelInterface = {
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
        isNew: true,
        thumbnailPath: thumbnailPath
    };
    return resource;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
