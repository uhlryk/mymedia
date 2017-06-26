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
    return this.getExtensionByName(project.projectExtensionName);
  }

  async onBeforeUpdate (data) {
    return await this.getActive().onBeforeUpdate(data);
  }

  async onBeforeCreate (data) {
    return await this.getActive().onBeforeCreate(data);
  }

  async onAfterUpdate (resourceId) {
    await this.getActive().onAfterUpdate(resourceId);
  }

  async onAfterCreate (resourceId) {
    await this.getActive().onAfterCreate(resourceId);
  }
}
