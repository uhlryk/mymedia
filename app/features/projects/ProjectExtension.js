import { addNewElementWithId } from "../../actions/attributes";
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
  createAttribute (id, extensionName, settings) {
    this.getManager().getRootManager().getStore().dispatch(
      addNewElementWithId(id, extensionName, settings)
    )
  }
}
