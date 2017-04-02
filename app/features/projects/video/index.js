import FileProjectExtension from "../file/index";
import path from "path";

export default class extends FileProjectExtension {
  constructor () {
    super("video");
    this.setDisplayName("Video files");
    this.setDescription("Project for video files");
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = ["avi", "mov", "wmv"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }
}
