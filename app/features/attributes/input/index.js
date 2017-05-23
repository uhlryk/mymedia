import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class InputAttributesExtension extends AttributesExtension {
  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "input", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "input",
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

  getQuickSearchFunction (search) {
    return (value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    }
  }
}
