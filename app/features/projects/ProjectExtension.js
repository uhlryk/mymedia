import { addNewAttributeWithId } from "../../actions/attributes";
import Extensioner from "extensioner";
export default class ProjectExtension extends Extensioner.Extension {
  setDisplayName(displayName) {
    this._displayName = displayName;
  }
  getDisplayName() {
    return this._displayName;
  }
  setDescription(description) {
    this._description = description;
  }
  getDescription() {
    return this._description;
  }
  createProject (response, initialValue) {}
  collectProjectFiles (files) {
    return files;
  }
  mapFilesProperties (files) {
    return files.map(file => Object.assign({}, file, this.mapFileProperties(file)));
  }
  mapFileProperties (file) {
    return file;
  }
  createAttribute (id, extensionName, settings) {
    this.getManager().getRootManager().getStore().dispatch(
      addNewAttributeWithId(id, extensionName, settings)
    )
  }
}
