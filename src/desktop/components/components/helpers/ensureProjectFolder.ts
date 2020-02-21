import * as fse from "fs-extra";

export default async function ensureProjectFolder(projectFolder: string) {
    await fse.ensureDir(projectFolder);
}
