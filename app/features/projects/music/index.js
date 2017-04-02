import FileProjectExtension from "../file/index";
import path from "path";

export default class extends FileProjectExtension {
  constructor () {
    super("music");
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = ["mp3"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }

  onListProjects (projects) {
    projects = projects || [];
    projects.push({
      extensionName: this.getName(),
      displayName: "Music files",
      description: "Project for music files"
    });
    return projects;
  }
}
