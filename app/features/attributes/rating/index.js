import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";
import AttributesExtension from "../AttributesExtension";

export default class RatingAttributesExtension extends NumberAttributesExtension {
  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "rating", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "rating",
        attributes: [{
          name: "starNumber",
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
    }, configuration));
  }

}
