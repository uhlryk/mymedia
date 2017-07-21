import AttributesExtension from "../AttributesExtension";
import FileDropUploadAttributesExtension from "../fileDropUpload/index";
import View from "./View.jsx";

export default class ImageAttributesExtension extends FileDropUploadAttributesExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "image", AttributesExtension.mergeConfiguration({
      settings: {
        displayName: "image",
      },
      view: {
        component: View
      }
    }, configuration));
  }

  getView (props) {
    const project = this.getManager().getRootManager().getStore().getState().project;
    return super.getView(Object.assign({}, props, { projectPath: project.path }));
  }

}
