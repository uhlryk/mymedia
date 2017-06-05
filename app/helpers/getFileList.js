import fse from "fs-extra";
import path from "path";

async function walk(baseDir, dir) {
  let results = [];
  let fileList = await fse.readdir(dir);
  for (let fileName of fileList) {
    let filePath = path.resolve(dir, fileName);
    let fileStat = fse.stat(filePath);
    if (fileStat && fileStat.isDirectory()) {
      results.concat(await walk(baseDir, filePath));
    } else if (fileStat && fileStat.isFile()){
      results.push({
        name: fileName,
        path: path.relative(baseDir, filePath),
        stat: fileStat
      });
    }
  }
  return results;
}
export default async function getFileList(dir) {
  return await walk(dir, dir);
}
