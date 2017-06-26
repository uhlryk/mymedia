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
      async (attributeExtension, value, attribute, resource) => await attributeExtension.onBeforeUpdate(value, attribute, resource));
  }

  async onBeforeCreate (modifiedResource) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    return await callModificationEventMethod(this, attributes, modifiedResource,
      async (attributeExtension, value, attribute, resource) => await attributeExtension.onBeforeCreate(value, attribute, resource));
  }

  async onAfterUpdate (resourceId) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    const resources = this.getRootManager().getStore().getState().resources;
    const resource = resources[resourceId];
    await callModificationEventMethod(this, attributes, resource,
      async (attributeExtension, value, attribute, resource) => await attributeExtension.onAfterUpdate(value, attribute, resource))
  }

  async onAfterCreate (resourceId) {
    const attributes = this.getRootManager().getStore().getState().attributes;
    const resources = this.getRootManager().getStore().getState().resources;
    const resource = resources[resourceId];
    await callModificationEventMethod(this, attributes, resource,
      async (attributeExtension, value, attribute, resource) => await attributeExtension.onAfterCreate(value, attribute, resource))
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
    const attributeExtension = extensionManager.getExtensionByName(attribute.extensionName);
    const value = resource[attributeId];
    resource[attributeId] = await callback(attributeExtension, value, attribute, resource);
  }
  return resource
}
