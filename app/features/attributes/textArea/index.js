import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class TextAreaAttributesExtension extends AttributesExtension {

  constructor (extensionName, ...configurations) {
    super(extensionName || "textArea", {
      view: {
        component: View
      },
      settings: {
        displayName: "text area",
        component: Settings
      },
      edit: {
        component: FormField
      },
      create: {
        component: FormField
      }
    }, ...configurations);
  }

  getQuickSearchFunction (search) {
    return (value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    }
  }
}
