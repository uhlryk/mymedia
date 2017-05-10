import InputAttributesExtension from "../input/index";

export default class NumberAttributesExtension extends InputAttributesExtension {
  constructor () {
    super();
    this.setName ("number");
    this.setDisplayName("number");
  }

  getSortFunction (attributeId, order) {
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
