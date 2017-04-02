import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class InputAttributesExtension extends AttributesExtension {
  static TYPE = "input";
  constructor () {
    super("input");
    this.setDisplayName("input");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
