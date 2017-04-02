import { addNewElementWithId } from "../../actions/formElement";
import Extensioner from "extensioner";
export default class ProjectExtension extends Extensioner.Extension {
  createProject (response, initialValue) {}
  collectProjectFiles (files) {
    return files;
  }
  createFormElement (id, extensionName, settings) {
    this.getManager().getRootManager().getStore().dispatch(
      addNewElementWithId(id, extensionName, settings)
    )
  }
}
