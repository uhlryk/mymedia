import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class HierarchicalTagAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("hierarchicalTag");
    this.setView(View);
    this.setOnlyProjectExtensionUse();
    this.enableSortable();
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
}
