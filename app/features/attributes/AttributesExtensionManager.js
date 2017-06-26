import Extensioner from "extensioner";
export default class AttributesExtensionManager extends Extensioner.Manager {
  constructor (rootManager) {
    super();
    this._rootManager = rootManager;
  }

  getRootManager() {
    return this._rootManager;
  }

  async onBeforeUpdate (data) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    for (const attribute of Object.values(attributes)) {
      const attributeId = attribute.id;
      const attributeExtensionName = attribute.extensionName;
      const attibuteExtension = this.getExtensions().find(extension => extension.getName() === attributeExtensionName);
      const value = data[attributeId];
      data[attributeId] = await attibuteExtension.onBeforeUpdate(value, attribute);
    }
  }

  async onBeforeCreate (data) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    for (const attribute of Object.values(attributes)) {
      const attributeId = attribute.id;
      const attributeExtensionName = attribute.extensionName;
      const attibuteExtension = this.getExtensions().find(extension => extension.getName() === attributeExtensionName);
      const value = data[attributeId];
      data[attributeId] = await attibuteExtension.onBeforeCreate(value, attribute);
    }
  }

  static validate(attribute, value) {
    if (attribute.isRequired && (value === "" || (value === undefined && !attribute.defaultValue))) {
      return "Field is required";
    }
    return true;
  }
}
