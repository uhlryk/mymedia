import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension.renderer";

export default class DateAttributesExtension extends AttributesExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "date", {
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
