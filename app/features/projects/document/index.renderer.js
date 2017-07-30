import FileProjectExtension from "../file/index.renderer";
import ProjectExtension from "../ProjectExtension.renderer";

export default class extends FileProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "document", ProjectExtension.mergeConfiguration({
      displayName: "Document files",
      description: "Project for document files"
    }, configuration));
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = [".doc"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }
}
