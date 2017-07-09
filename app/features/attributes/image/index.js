import AttributesExtension from "../AttributesExtension";
import FileDropUploadAttributesExtension from "../fileDropUpload/index";

export default class ImageAttributesExtension extends FileDropUploadAttributesExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "image", AttributesExtension.mergeConfiguration({
      settings: {
        displayName: "image",
      }
    }, configuration));
  }

}
