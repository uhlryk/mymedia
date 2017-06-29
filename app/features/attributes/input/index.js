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
        attributes: [{
          name: "placeholder",
          extensionName: "input",
          displayName: "Placeholder",
          placeholder: "Enter placeholder",
          create: {}
        }, {
          name: "defaultValue",
          extensionName: "input",
          displayName: "Default value",
          placeholder: "Enter default value",
          create: {}
        }]
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
