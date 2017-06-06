import { addNewAttributeWithId } from "../../actions/attributes";
import Extensioner from "extensioner";
//import p from "bluebird";
export default class ProjectExtension extends Extensioner.Extension {
  constructor(extensionName, configuration = {}) {
    super();
    this.setName(extensionName);
    this.setConfig(configuration);
  }

  setConfig(configuration) {
    this._configuration = ProjectExtension.mergeConfiguration({}, configuration);
  }

  getConfig() {
    return this._configuration;
  }

  createProject (response, initialValue) {}
  collectProjectFiles (files) {
    return files;
  }
  async mapFilesProperties (files) {
    let mappedFiles = [];
    for (let file of files) {
      mappedFiles.push(await this.mapFileProperties(file))
    }
    return mappedFiles;
  }
  async mapFileProperties (file) {
    return file;
  }

  createAttribute (id, extensionName, settings) {
    this.getManager().getRootManager().getStore().dispatch(
      addNewAttributeWithId(id, extensionName, settings)
    )
  }

  static mergeConfiguration(source, target) {
    return _.merge(source, target);
  }
}
