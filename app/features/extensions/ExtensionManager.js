import BaseExtensionManager from "./BaseExtensionManager";
import FormElementsExtensionManager from "./formElements/FormElementsExtensionManager";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
export default class ExtensionManager extends BaseExtensionManager {
  constructor (store) {
    super(store);
    this.formElementsExtensionManager = new FormElementsExtensionManager(store, this);
    this.projectsExtensionManager = new ProjectsExtensionManager(store, this);
  }
  register(extension) {
    switch (extension.getType()) {
      case FormElementsExtensionManager.TYPE:
        this.formElementsExtensionManager.register(extension);
        break;
      case ProjectsExtensionManager.TYPE:
        this.projectsExtensionManager.register(extension);
        break;
      default:
        super.register(extension)
    }
  }

  getFormElements() {
    return this.formElementsExtensionManager;
  }

  getProjects() {
    return this.projectsExtensionManager;
  }

  onStoreChange(store) {
    super.onStoreChange(store);
    this.getFormElements().onStoreChange(store);
    this.getProjects().onStoreChange(store);
  }
}
