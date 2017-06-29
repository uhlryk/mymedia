import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";


export default class NumberAttributesExtension extends AttributesExtension {
  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "number", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "number",
        attributes: [{
          name: "defaultValue",
          extensionName: "number",
          displayName: "Default value",
          defaultValue: 0,
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

  getSortFunction (order) {
    return (a, b) => {
      const aNum = Number(a);
      const bNum = Number(b);
      if (order === "ASC") {
        return aNum - bNum;
      } else {
        return bNum - aNum;
      }
    };
  }
}
