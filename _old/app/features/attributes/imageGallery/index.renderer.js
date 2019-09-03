import FileDropUploadAttributesExtension from "../fileDropUpload/index.renderer";
import View from "./View.jsx";

export default class ImageGalleryAttributesExtension extends FileDropUploadAttributesExtension {

  constructor (extensionName, ...configurations) {
    super(extensionName || "imageGallery", {
      settings: {
        displayName: "image gallery",
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
