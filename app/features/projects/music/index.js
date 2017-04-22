import FileProjectExtension from "../file/index";
import path from "path";

export default class extends FileProjectExtension {
  constructor () {
    super();
    this.setName("music");
    this.setDisplayName("Music files");
    this.setDescription("Project for music files");
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = [".mp3"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }
}
