import Extensioner from "extensioner";
export default class ProjectExtension extends Extensioner.Extension {
  constructor(extensionName, configuration = {}) {
    super();
    this.setName(extensionName);
    this.setConfig(configuration);
  }
}
