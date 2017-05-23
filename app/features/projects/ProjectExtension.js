import { addNewAttributeWithId } from "../../actions/attributes";
import Extensioner from "extensioner";
import p from "bluebird";
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
  mapFilesProperties (files) {
    return p.mapSeries(files, file => this.mapFileProperties(file));
  }
  mapFileProperties (file) {
    return p.resolve(file);
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
