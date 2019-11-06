import * as fse from "fs-extra";
import * as path from "path";

export default async function saveFile(
    projectFolderPath: string,
    projectFile: string,
    thumbnailFolder: string,
    content
) {
    const isProjectFolderExist: boolean = await fse.pathExists(projectFolderPath);
    if (isProjectFolderExist === false) {
        await fse.mkdir(projectFolderPath);
        await fse.mkdir(path.resolve(projectFolderPath, thumbnailFolder));

    }
    await fse.writeFile(path.resolve(projectFolderPath, projectFile), content);
}
