import BaseExtensionManager from "./BaseExtensionManager";
import FormElementsExtensionManager from "./formElements/FormElementsExtensionManager";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
export default class ExtensionManager extends BaseExtensionManager {
  constructor () {
    super();
    this.formElementsExtensionManager = new FormElementsExtensionManager(this);
    this.projectsExtensionManager = new ProjectsExtensionManager(this);
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
}
