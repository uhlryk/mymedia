import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class CheckboxAttributesExtension extends AttributesExtension {
  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "checkbox", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "checkbox",
        attributes: [{
          name: "viewLabel",
          extensionName: "input",
          displayName: "View Label",
          placeholder: "Enter view label",
          create: {}
        }, {
          name: "editLabel",
          extensionName: "input",
          displayName: "Edit Label",
          placeholder: "Enter edit label",
          create: {}
        }, {
          name: "defaultValue",
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
    }, configuration));
  }

}
