import * as fse from "fs-extra";
import * as path from "path";

export default async function loadFile(
    projectFolderPath: string,
    projectFile: string
): Promise<string> {
    const isProjectFolderExist = await fse.pathExists(projectFolderPath);
    if (isProjectFolderExist) {
        const projectFolderStat = await fse.stat(projectFolderPath);
        if (projectFolderStat.isDirectory()) {
            const projectFilePath = path.resolve(projectFolderPath, projectFile);
            const projectFileStat = await fse.stat(projectFilePath);
            if (projectFileStat.isFile()) {
                const fileBuffer: Buffer = await fse.readFile(projectFilePath);
                return fileBuffer.toString();
            }
        }
    }
    return null;
}
