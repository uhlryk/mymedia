import * as fse from "fs-extra";
import * as path from "path";

export default async function loadFile(dir, name): Promise<string> {
    const files = await fse.readdir(dir);
    for (let file of files) {
        let dirName = path.resolve(dir, file);
        let stat = await fse.stat(dirName);
        if (stat.isFile() && file === name) {
            const fileBuffer: Buffer = await fse.readFile(dirName);
            return fileBuffer.toString();
        }
    }
    return null;
}
