import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension.renderer";

export default class NumberAttributesExtension extends AttributesExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "number", {
      view: {
        component: View
      },
      settings: {
        displayName: "number",
        attributes: [{
          id: "defaultValue",
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
    }, ...configurations);
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
