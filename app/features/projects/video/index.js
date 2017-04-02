import FileProjectExtension from "../file/index";
import path from "path";

export default class extends FileProjectExtension {
  constructor () {
    super("video");
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = ["avi", "mov", "wmv"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }

  onListProjects (projects) {
    projects = projects || [];
    projects.push({
      extensionName: this.getName(),
      displayName: "Video files",
      description: "Project for video files"
    });
    return projects;
  }
}
