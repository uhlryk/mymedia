import InputAttributesExtension from "../input/index";

export default class NumberAttributesExtension extends InputAttributesExtension {
  constructor () {
    super();
    this.setName ("number");
    this.setDisplayName("number");
  }
}
