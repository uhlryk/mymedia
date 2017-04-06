import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class InputAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("input");
    this.setDisplayName("input");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
