import FileProjectExtension from "../file/index";
import path from "path";

export default class extends FileProjectExtension {
  static FILE_EXTENSIONS = ["avi", "mov", "wmv"];
  constructor () {
    super("video");
  }

  onCreateProject () {
    super.onCreateProject();
  }

  onFilterFiles (filteredFiles, initialFiles) {
    let files = filteredFiles || initialFiles;
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FileProjectExtension.FILE_EXTENSIONS.includes(fileExtension);
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
