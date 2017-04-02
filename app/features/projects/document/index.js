import FileProjectExtension from "../file/index";

export default class extends FileProjectExtension {
  constructor () {
    super("document");
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = ["doc"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
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
