import ensureProjectFolder from "./helpers/ensureProjectFolder";
import * as path from "path";
import Store from "./Store";
import syncDbWithFs from "./helpers/syncDbWithFs";
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
        await syncDbWithFs(this.projectFolderPath, this.store);
    }

    public destroy() {}
}
