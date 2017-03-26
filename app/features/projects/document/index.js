import FileProjectExtension from "../file/index";

export default class extends FileProjectExtension {
  constructor () {
    super("document");
  }

  onCreateProject () {
    super.onCreateProject();
  }

  onFilterFiles (filteredFiles, initialFiles) {
    let files = filteredFiles || initialFiles;
    return files;
  }

  onListProjects (projects) {
    projects = projects || [];
    projects.push({
      extensionName: this.getName(),
      displayName: "Document files",
      description: "Project for document files"
    });
    return projects;
  }
}
