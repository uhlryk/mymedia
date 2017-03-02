import BaseExtensionManager from "./BaseExtensionManager";
import FormElementsExtensionManager from "./formElements/FormElementsExtensionManager";
export default class ExtensionManager extends BaseExtensionManager {
  constructor () {
    super();
    this.formElementsExtensionManager = new FormElementsExtensionManager();
  }
  register(extension) {
    switch (extension.getType()) {
      case FormElementsExtensionManager.TYPE:
        this.formElementsExtensionManager.register(extension);
        break;
      default:
        super.register(extension)
    }
  }
  getFormElements() {
    return this.formElementsExtensionManager;
  }
}
