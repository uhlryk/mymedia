import FileProjectExtension from "../file/index";
import path from "path";

export default class extends FileProjectExtension {
  static FILE_EXTENSIONS = ["mp3"];
  constructor () {
    super("music");
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
      displayName: "Music files",
      description: "Project for music files"
    });
    return projects;
  }
}
