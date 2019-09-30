import * as fse from "fs-extra";
import * as path from "path";

export default async function saveFile(
    directory: string,
    projectFolderName: string,
    projectFile: string,
    content
) {
    const projectFolderPath = path.resolve(directory, projectFolderName);
    const isProjectFolderExist: boolean = await fse.pathExists(projectFolderPath);
    if (isProjectFolderExist === false) {
        await fse.mkdir(path.resolve(directory, projectFolderName));
    }
    await fse.writeFile(path.resolve(directory, projectFolderName, projectFile), content);
}
