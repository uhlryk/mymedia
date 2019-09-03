import FileProjectExtension from "../file/index.renderer";
import path from "path";

export default class extends FileProjectExtension {

  constructor (extensionName, ...configurations) {
    super(extensionName || "music", {
      displayName: "Music files",
      description: "Project for music files"
    }, ...configurations);
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = [".mp3"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }
}
