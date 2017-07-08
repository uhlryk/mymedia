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

  createAttribute (id, extensionName, settings) {
    this.getManager().getRootManager().getStore().dispatch(
      addNewAttributeWithId(id, extensionName, settings)
    )
  }

  async onBeforeUpdate (modifiedResource) {
    return modifiedResource;
  }

  async onPostBeforeUpdate (modifiedResource) {
    return modifiedResource;
  }

  async onBeforeCreate (modifiedResource) {
    return modifiedResource;
  }

  async onPostBeforeCreate (modifiedResource) {
    return modifiedResource;
  }

  async onAfterUpdate (resourceId) {

  }

  async onAfterCreate (resourceId) {

  }

  static mergeConfiguration(source, target) {
    return _.merge(source, target);
  }
}
