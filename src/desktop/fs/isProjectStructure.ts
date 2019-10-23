import * as fse from "fs-extra";
import * as path from "path";

export default async function isProject(
    directory: string,
    projectFolderName: string,
): Promise<boolean> {
    const projectFolderPath = path.resolve(directory, projectFolderName);
    const isProjectFolderExist = await fse.pathExists(projectFolderPath);
    if (isProjectFolderExist) {
        return true;
    }
    return false;
}
