import FileDropUploadAttributesExtension from "../fileDropUpload/index.renderer";
import View from "./View.jsx";

export default class ImageAttributesExtension extends FileDropUploadAttributesExtension {

  constructor (extensionName, ...configurations) {
    super(extensionName || "image", {
      settings: {
        displayName: "image",
      },
      view: {
        component: View
      }
    }, ...configurations);
  }

  getView (props) {
    const project = this.getManager().getRootManager().getStore().getState().project;
    return super.getView(Object.assign({}, props, { projectPath: project.path }));
  }

}
