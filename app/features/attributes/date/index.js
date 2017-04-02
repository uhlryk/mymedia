import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class DateAttributesExtension extends AttributesExtension {
  constructor () {
    super("date");
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }
}
