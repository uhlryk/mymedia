import InputAttributesExtension from "../input/index";
import AttributesExtension from "../AttributesExtension";

export default class NumberAttributesExtension extends InputAttributesExtension {
  constructor (extensionName, configuration = {}) {
    super(extensionName || "number", AttributesExtension.mergeConfiguration({
      settings: {
        displayName: "number"
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
