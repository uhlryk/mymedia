import ensureProjectFolder from "./helpers/ensureProjectFolder";
import * as path from "path";
const Store = require("electron-store");
export default class Project {
    static PROJECT_FOLDER = ".mymedia";
    private static projectInstance: Project;
    private readonly resourceFolderPath;
    private readonly projectFolderPath;
    private store;
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
    }

    /**
     * create if doesn't exist project folder
     */
    public async init() {
        await ensureProjectFolder(this.projectFolderPath);
        // this.store = new Store({
        //     schema: {
        //         projects: { list: [] }
        //     },
        // });
    }

    public destroy() {}
}
