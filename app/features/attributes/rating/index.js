import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";
import AttributesExtension from "../AttributesExtension";

export default class RatingAttributesExtension extends NumberAttributesExtension {
  constructor (extensionName, configuration = {}) {
    super(extensionName || "rating", AttributesExtension.mergeConfiguration({
      displayName: "rating",
      view: {
        component: View
      },
      settings: {
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

}
