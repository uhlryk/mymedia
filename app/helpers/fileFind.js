import fsp from "fs-promise";
import path from "path";

export default async function fileFind(dir, name) {
  let files = await fsp.readdir(dir);
  for (let file of files) {
    let dirName = path.resolve(dir, file);
    let stat = await fsp.stat(dirName);
    if (stat.isFile() && file === name) {
      return await fsp.readFile(dirName);
    }
  }
  return null;
}
