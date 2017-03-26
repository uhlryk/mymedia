import Extensioner from "extensioner";
export default class StoreExtensionManager extends Extensioner.Manager {
  constructor (store) {
    super();
    this.store = store;
  }

  getStore() {
    return this.store;
  }
}
