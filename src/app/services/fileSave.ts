import fse from "fs-extra";

export default async function fileSave(dir, content) {
  await fse.writeFile(dir, content);
}
