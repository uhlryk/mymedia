import BaseExtensionManager from "../BaseExtensionManager";
import * as STATUS from "../../../constants/status";

export default class ProjectsExtensionManager extends BaseExtensionManager {
  static TYPE = "projectsExtension";

  constructor(store, parent) {
    super(store, parent);
    this.currentProjectExtension = null;
  }

  /**
   * This method is called each time store is changed. And it is checking if current project is changed and set
   * return this.currentProjectExtension with reference to current project extension
   * @param redux store
     */
  onStoreChange(store) {
    super.onStoreChange(store);
    if (
      (store.project && store.project.projectType) &&
      (!this.currentProjectExtension || this.currentProjectExtension.getName() !== store.project.projectType)
    ) {
      this.currentProjectExtension = this.getExtension(store.project.projectType);
      this.onProjectChange(store.project.status === STATUS.NEW);
    }
  }

  onProjectChange(isNew) {
    if (isNew) {
      this.getCurrent().onCreate();
    }
  }

  /**
   * return selected by user project extension reference
   * From extension if we want current project:
   * this.context.extensions.getProjects().getCurrent()
   * @returns {ProjectExtension|null}
     */
  getCurrent() {
    return this.currentProjectExtension;
  }
}
