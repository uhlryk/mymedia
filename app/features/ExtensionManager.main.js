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
    const extension = this.getExtensionByName(extensionName);
    if (extension) {
      return await extension.responseMainProcess(command, ...requestData);
    } else {
      console.warn(`dispatchRequestProcess no extension ${extensionName}`)
    }
  }
}
