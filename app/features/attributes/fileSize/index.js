import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";
import AttributesExtension from "../AttributesExtension";

export default class FileSizeAttributesExtension extends NumberAttributesExtension {
  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "fileSize", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        createDisabled: true,
        editDisabled: true,
        deleteDisabled: true
      }
    }, configuration));
  }
}
