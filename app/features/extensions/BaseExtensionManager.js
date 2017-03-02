export default class BaseExtensionManager {

  constructor() {
    this.extensions = [];
  }

  register(extension) {
    this.extensions.push(extension);
    extension.onRegister(this);
  }

  getExtension(name) {
    return this.extensions.find(extension => extension.getName() === name);
  }
}
