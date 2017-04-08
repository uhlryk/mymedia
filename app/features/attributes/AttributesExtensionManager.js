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
    if (attribute.isRequired && (value === "" || (value === undefined && !attribute.defaultValue))) {
      return "Field is required";
    }
    return true;
  }
}
