import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";

export default class FileSizeAttributesExtension extends NumberAttributesExtension {
  constructor () {
    super();
    this.setName ("fileSize");
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }
}
