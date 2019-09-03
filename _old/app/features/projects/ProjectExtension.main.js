import Extension from "../Extension.main";
export default class ProjectExtension extends Extension {
  constructor(extensionName, ...configurations) {
    super(extensionName, ...configurations);
  }
}
