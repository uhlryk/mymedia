import BaseExtensionManager from "../BaseExtensionManager";
export default class FormElementsExtensionManager extends BaseExtensionManager {
  static TYPE = "formElementsExtension";

  static validate(element, value) {
    if (element.settings.isRequired && (value === "" || (value === undefined && !element.settings.defaultValue))) {
      return "Field is required";
    }
    return true;
  }
}
