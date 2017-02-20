export default class ExtensionManager {

  constructor() {
    this.extensions = [];
  }

  register(extension) {
    this.extensions.push(extension);
    extension.onRegister(this);
  }

  getExtensions(type) {
    return this.extensions.filter(extension => extension.getConfig().type === type);
  }

  getFormElementExtensions() {
    return this.getExtensions("form-element");
  }

  getExtension(key) {
    return this.extensions.find(extension => extension.getConfig().key === key);
  }
}
