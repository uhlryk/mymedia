import Extensioner from "extensioner";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
import AttributesExtensionManager from "./attributes/AttributesExtensionManager";
export default class StoreExtensionManager extends Extensioner.Manager {
  constructor () {
    super();
    this.projects = new ProjectsExtensionManager(this);
    this.attributes = new AttributesExtensionManager(this);
  }

  setStore(store) {
    this._store = store;
  }

  getStore() {
    return this._store.getState();
  }
}
