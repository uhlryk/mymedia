import Extensioner from "extensioner";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
import AttributesExtensionManager from "./attributes/AttributesExtensionManager";
export default class StoreExtensionManager extends Extensioner.Manager {
  constructor (store) {
    super();
    this._store = store;
    this.projects = new ProjectsExtensionManager(this);
    this.attributes = new AttributesExtensionManager(this);
    this.registerEventListener("STORE_CHANGE", response => {
      this._store = response.getValue();
    });
  }

  getStore() {
    return this._store;
  }
}
