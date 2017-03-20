import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";

export default class DateFormElementsExtension extends FormElementsExtension {
  static TYPE = "date";
  constructor () {
    super();
    this.setName(DateFormElementsExtension.TYPE);
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }
}
