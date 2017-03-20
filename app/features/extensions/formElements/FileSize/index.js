import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";

export default class FileSizeFormElementsExtension extends FormElementsExtension {
  static TYPE = "fileSize";
  constructor () {
    super();
    this.setName(FileSizeFormElementsExtension.TYPE);
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }
}
