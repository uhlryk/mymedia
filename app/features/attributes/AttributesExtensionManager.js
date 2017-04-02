import Extensioner from "extensioner";
export default class AttributesExtensionManager extends Extensioner.Manager {
  constructor (rootManager) {
    super();
    this._rootManager = rootManager;
  }

  getRootManager() {
    return this._rootManager;
  }

  static validate(attribute, value) {
    if (attribute.settings.isRequired && (value === "" || (value === undefined && !attribute.settings.defaultValue))) {
      return "Field is required";
    }
    return true;
  }
}
