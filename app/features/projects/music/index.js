import FileProjectExtension from "../file/index";
import ProjectExtension from "../ProjectExtension";
import path from "path";

export default class extends FileProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "music", ProjectExtension.mergeConfiguration({
      displayName: "Music files",
      description: "Project for music files"
    }, configuration));
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = [".mp3"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }
}
