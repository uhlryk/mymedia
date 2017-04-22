import FileProjectExtension from "../file/index";

export default class extends FileProjectExtension {
  constructor () {
    super();
    this.setName("document");
    this.setDisplayName("Document files");
    this.setDescription("Project for document files");
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = [".doc"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }
}
