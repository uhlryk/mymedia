import BaseExtensionManager from "../BaseExtensionManager";
import { addNewElementWithId } from "../../../actions/formElement";

export default class ProjectsExtensionManager extends BaseExtensionManager {
  static TYPE = "projectsExtension";

  constructor(store, parent) {
    super(store, parent);
  }

  registerExtensions() {
    this.getCurrent().registerExtensions(extension => this.getParent().register(extension))
  }

  prepareProjectFiles(files) {
    const currentExtension = this.getCurrent();
    return files
      .filter(file => currentExtension.isFileSupported(file.name))
      .map(file => currentExtension.mapFileProperties(file))
  }

  onProjectCreate() {
    this.getCurrent().onCreate(
      (id, name, type, settings) => this.getStore().dispatch(
        addNewElementWithId(id, name, type, settings)
      )
    );
  }

  /**
   * return selected by user project extension reference
   * From extension if we want current project:
   * this.context.extensions.getProjects().getCurrent()
   * @returns {ProjectExtension|null}
     */
  getCurrent() {
    return this.getExtension(this.getStore().project.projectType);
  }
}
