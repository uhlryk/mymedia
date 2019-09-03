import FormField from "./FormField.jsx";
import View from "./View.jsx";
import NumberAttributesExtension from "../number/index.renderer";

export default class RatingAttributesExtension extends NumberAttributesExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "rating", {
      view: {
        component: View
      },
      settings: {
        displayName: "rating",
        attributes: [{
          id: "starNumber",
          extensionName: "number",
          displayName: "Number of stars",
          defaultValue: 5,
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
