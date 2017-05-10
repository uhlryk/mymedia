import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";

export default class FileSizeAttributesExtension extends NumberAttributesExtension {
  constructor () {
    super();
    this.setName ("fileSize");
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }

  getSortFunction (attributeId, order) {
    return (a, b) => {
      const aNum = Number(a[attributeId]);
      const bNum = Number(b[attributeId]);
      if (order === "ASC") {
        if (aNum < bNum) return -1;
        if (aNum > bNum) return 1;
      } else {
        if (aNum < bNum) return 1;
        if (aNum > bNum) return -1;
      }
      return 0;
    };
  }
}
