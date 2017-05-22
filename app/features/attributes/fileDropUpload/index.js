import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class FileDropUploadAttributesExtension extends AttributesExtension {
  constructor (extensionName, configuration = {}) {
    super(extensionName || "fileDropUpload", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "file drop upload",
        component: Settings
      },
      edit: {
        component: FormField
      },
      create: {
        component: FormField
      }
    }, configuration));
  }
}
