import Extensioner from "extensioner";
import ProjectsExtensionManager from "./projects/ProjectsExtensionManager";
export default class StoreExtensionManager extends Extensioner.Manager {
  constructor (store) {
    super();
    this.store = store;
    this.projects =  new ProjectsExtensionManager(this);
  }

  getStore() {
    return this.store;
  }
}
