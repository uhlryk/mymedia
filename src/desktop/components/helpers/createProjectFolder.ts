import * as fse from "fs-extra";

export default async function createProjectFolder(projectFolder: string) {
    await fse.mkdir(projectFolder);
}
