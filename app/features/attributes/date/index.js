import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class DateAttributesExtension extends AttributesExtension {
  constructor (extensionName, configuration = {}) {
    super(extensionName || "date", AttributesExtension.mergeConfiguration({
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
