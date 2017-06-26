import Extensioner from "extensioner";
export default class AttributesExtensionManager extends Extensioner.Manager {
  constructor (rootManager) {
    super();
    this._rootManager = rootManager;
  }

  getRootManager() {
    return this._rootManager;
  }

  async onBeforeUpdate (modifiedResource) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    return await callModificationEventMethod(this, attributes, modifiedResource,
      async (attributeExtension, value, attribute) => await attributeExtension.onBeforeUpdate(value, attribute));
  }

  async onBeforeCreate (modifiedResource) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    return await callModificationEventMethod(this, attributes, modifiedResource,
      async (attributeExtension, value, attribute) => await attributeExtension.onBeforeCreate(value, attribute));
  }

  async onAfterUpdate (resourceId) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    const resources = this.getRootManager().getStore().getState().resources;
    const resource = resources[resourceId];
    await callModificationEventMethod(this, attributes, resource,
      async (attributeExtension, value, attribute) => await attributeExtension.onAfterUpdate(value, attribute))
  }

  async onAfterCreate (resourceId) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    const resources = this.getRootManager().getStore().getState().resources;
    const resource = resources[resourceId];
    await callModificationEventMethod(this, attributes, resource,
      async (attributeExtension, value, attribute) => await attributeExtension.onAfterCreate(value, attribute))
  }

  static validate(attribute, value) {
    if (attribute.isRequired && (value === "" || (value === undefined && !attribute.defaultValue))) {
      return "Field is required";
    }
    return true;
  }
}

async function callModificationEventMethod (extensionManager, attributes, resource, callback) {
  for (const attribute of Object.values(attributes)) {
    const attributeId = attribute.id;
    console.log(extensionManager);
    const attributeExtension = extensionManager.getExtensionByName(attribute.extensionName);
    const value = resource[attributeId];
    resource[attributeId] = await callback(attributeExtension, value, attribute);
  }
  return resource
}
