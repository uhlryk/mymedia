export default class BaseExtensionManager {

  constructor(store, parent = null) {
    this.extensions = [];
    this.store = store;
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }

  setStore(store) {
    this.store = store;
  }

  getStore() {
    return this.store;
  }

  onStoreChange(store) {
    this.setStore(store);
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
