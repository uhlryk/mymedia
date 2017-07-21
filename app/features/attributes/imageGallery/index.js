import AttributesExtension from "../AttributesExtension";
import FileDropUploadAttributesExtension from "../fileDropUpload/index";
import View from "./View.jsx";

export default class ImageGalleryAttributesExtension extends FileDropUploadAttributesExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "imageGallery", AttributesExtension.mergeConfiguration({
      settings: {
        displayName: "image gallery",
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
