import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class FileDropUploadAttributesExtension extends AttributesExtension {
  constructor (extensionName = null, configuration = {}) {
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

  async onBeforeCreate (value, attribute) {
    console.log("onBeforeCreate fileDrop", value, attribute);
    return value;
  }

  async onBeforeUpdate (value, attribute) {
    console.log("onBeforeUpdate fileDrop", value, attribute);
    return value;
  }

  async onAfterCreate (value, attribute) {
    console.log("onAfterCreate fileDrop", value, attribute);
  }

  async onAfterUpdate (value, attribute) {
    console.log("onAfterUpdate fileDrop", value, attribute);
  }
}
