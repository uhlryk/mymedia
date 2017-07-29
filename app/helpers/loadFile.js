import fse from "fs-extra";
import path from "path";

export default async function loadFile(dir, name) {
  console.log(dir, name);
  let files = await fse.readdir(dir);
  console.log("AA1", files);
  for (let file of files) {
    let dirName = path.resolve(dir, file);
    let stat = await fse.stat(dirName);
    if (stat.isFile() && file === name) {
      return await fse.readFile(dirName);
    }
  }
  return null;
}
