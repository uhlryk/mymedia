import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class TextAreaAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("textArea");
    this.setDisplayName("text area");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
