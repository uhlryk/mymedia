import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class FileSizeAttributesExtension extends AttributesExtension {
  constructor () {
    super("fileSize");
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }
}
