export default class BaseExtensionManager {

  constructor(parent = null) {
    this.extensions = [];
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  register(extension) {
    this.extensions.push(extension);
    extension.onRegister(this);
  }

  getExtension(name) {
    return this.extensions.find(extension => extension.getName() === name);
  }

  getExtensions() {
    return this.extensions;
  }
}
