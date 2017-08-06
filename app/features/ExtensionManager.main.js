import Extensioner from "extensioner";
export default class StoreExtensionManager extends Extensioner.Manager {
  constructor (list) {
    super();

    if(list.attributes) {
      Object.keys(list.attributes).forEach(elemName => {
        let Extension = list.extensions[elemName].MainProjectExtension;
        this.registerExtension(new Extension())
      });
    }
    if(list.projects) {
      Object.keys(list.projects).forEach(elemName => {
        let Extension = list.projects[elemName].MainProjectExtension;
        this.registerExtension(new Extension())
      });
    }
  }

  async dispatchRequestProcess (extensionName, command, ...requestData) {
    return await this.getExtensionByName(extensionName).responseMainProcess(command, ...requestData);
  }
}
