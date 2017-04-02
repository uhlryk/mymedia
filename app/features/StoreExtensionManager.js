import Extensioner from "extensioner";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
import AttributesExtensionManager from "./attributes/AttributesExtensionManager";
class AAA extends Extensioner.Manager {};
new AAA();
export default class StoreExtensionManager extends Extensioner.Manager {
  constructor (store) {
    super();
    this._store = store;
    this.projects =  new ProjectsExtensionManager(this);
    this.attributes =  new AttributesExtensionManager(this);
  }

  getStore() {
    return this._store;
  }
}
