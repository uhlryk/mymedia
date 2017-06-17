import Extensioner from "extensioner";
export default class ProjectExtensionManager extends Extensioner.Manager {
  constructor (rootManager) {
    super();
    this._rootManager = rootManager;
  }
  getRootManager() {
    return this._rootManager;
  }
  getActive() {
    let project = this.getRootManager().getStore().getState().project;
    return this.getExtensions().find(extension => extension.getName() === project.projectExtensionName);
  }
}
