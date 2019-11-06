import * as fse from "fs-extra";
import * as path from "path";

export default async function saveFile(
    projectFolderPath: string,
    projectFile: string,
    content
) {
    await fse.writeFile(path.resolve(projectFolderPath, projectFile), content);
}
