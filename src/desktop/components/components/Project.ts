import ensureProjectFolder from "./helpers/ensureProjectFolder";
import * as path from "path";
import Store from "./Store";
import IFile from "./types/file.interface";
import getProjectFileList from "./helpers/getProjectFileList";
export default class Project {
    static PROJECT_FOLDER = ".mymedia";
    private static projectInstance: Project;
    private readonly resourceFolderPath;
    private readonly projectFolderPath;
    private store: Store;
    public static async getNewProjectInstance(resourceFolderPath: string) {
        if (Project.projectInstance) {
            Project.projectInstance.destroy();
        }
        Project.projectInstance = new Project(resourceFolderPath);
        await Project.projectInstance.init();
    }

    constructor(resourceFolderPath) {
        this.resourceFolderPath = resourceFolderPath;
        this.projectFolderPath = path.resolve(
            this.resourceFolderPath,
            Project.PROJECT_FOLDER
        );
        this.store = new Store(this.projectFolderPath);
    }

    /**
     * create if doesn't exist project folder
     */
    public async init() {
        await ensureProjectFolder(this.projectFolderPath);
        const fileList: Array<IFile> = await getProjectFileList(this.resourceFolderPath);
        console.log(fileList);
    }

    public destroy() {}
}
