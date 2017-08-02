import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class InputAttributesExtension extends AttributesExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "input", {
      view: {
        component: View
      },
      settings: {
        displayName: "input",
        attributes: [{
          id: "placeholder",
          extensionName: "input",
          displayName: "Placeholder",
          placeholder: "Enter placeholder",
          create: {}
        }, {
          id: "defaultValue",
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
    }, ...configurations);
  }

  getQuickSearchFunction (search) {
    return (value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    }
  }
}
