import * as fse from "fs-extra";
import * as path from "path";
import FileInterface from "../types/file.interface";
const ACCEPTABLE_EXTENSIONS = [".wmv", ".mp4", ".mov", ".webm", ".mkv", ".flv", ".vob", ".avi", ".rmvb"];
async function walk(baseDir, dir): Promise<Array<FileInterface>> {
    const results: Array<FileInterface> = [];
    const fileList = await fse.readdir(dir);
    for (const fileName of fileList) {
        const filePath = path.resolve(dir, fileName);
        const fileStat = await fse.stat(filePath);
        if (fileStat && fileStat.isDirectory()) {
            Array.prototype.push.apply(results, await walk(baseDir, filePath));
        } else if (fileStat && fileStat.isFile()) {
            const extension = path.extname(filePath);
            if (!/(^|\/)\.[^\/\.]/g.test(filePath) && ACCEPTABLE_EXTENSIONS.includes(extension)) {
                results.push({
                    fileName: fileName,
                    name: path.parse(filePath).name,
                    filePath: path.relative(baseDir, filePath),
                    size: fileStat.size
                });
            }
        }
    }
    return results;
}
export default async function getFileList(dir): Promise<Array<FileInterface>> {
    return await walk(dir, dir);
}
