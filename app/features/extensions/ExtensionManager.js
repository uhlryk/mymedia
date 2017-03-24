import BaseExtensionManager from "./BaseExtensionManager";
import FormElementsExtensionManager from "./formElements/FormElementsExtensionManager";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
export default class ExtensionManager extends BaseExtensionManager {
  constructor (store) {
    super(store);
    this.formElementsExtensionManager = new FormElementsExtensionManager(store, this);
    this.projectsExtensionManager = new ProjectsExtensionManager(store, this);
  }
  registerExtension(extension) {
    switch (extension.getType()) {
      case FormElementsExtensionManager.TYPE:
        this.formElementsExtensionManager.registerExtension(extension);
        break;
      case ProjectsExtensionManager.TYPE:
        this.projectsExtensionManager.registerExtension(extension);
        break;
      default:
        super.registerExtension(extension)
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
