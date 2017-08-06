import View from "./View.jsx";
import NumberAttributesExtension from "../number/index.renderer";

export default class FileSizeAttributesExtension extends NumberAttributesExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "fileSize", {
      view: {
        component: View
      },
      settings: {
        createDisabled: true,
        editDisabled: true,
        deleteDisabled: true
      }
    }, ...configurations);
  }
}
