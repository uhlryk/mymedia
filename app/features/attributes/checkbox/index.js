import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class CheckboxAttributesExtension extends AttributesExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "checkbox", {
      view: {
        component: View
      },
      settings: {
        displayName: "checkbox",
        attributes: [{
          id: "viewLabel",
          extensionName: "input",
          displayName: "View Label",
          placeholder: "Enter view label",
          create: {}
        }, {
          id: "editLabel",
          extensionName: "input",
          displayName: "Edit Label",
          placeholder: "Enter edit label",
          create: {}
        }, {
          id: "defaultValue",
          extensionName: "checkbox",
          displayName: "Default value",
          editLabel: "Choose default value",
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

}
