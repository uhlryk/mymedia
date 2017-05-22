import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class HierarchicalTagAttributesExtension extends AttributesExtension {

  constructor (extensionName, configuration = {}) {
    super(extensionName || "hierarchicalTag", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        createDisabled: true,
        editDisabled: true,
        deleteDisabled: true
      }
    }, configuration));
  }

  getSortFunction (order) {
    return (a, b) => {
      a = a.join("");
      b = b.join("");
      if (order === "ASC") {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a < b) return 1;
        if (a > b) return -1;
      }
      return 0;
    };
  }

  getQuickSearchFunction (search) {
    return (values = []) => {
      return values.find(value => value.toLowerCase().includes(search.toLowerCase()));
    }
  }
}
