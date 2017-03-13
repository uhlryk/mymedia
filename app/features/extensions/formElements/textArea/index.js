import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";

export default class TextAreaFormElementsExtension extends FormElementsExtension {
  static TYPE = "textArea";
  constructor () {
    super();
    this.setDisplayName("text area");
    this.setName(TextAreaFormElementsExtension.TYPE);
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
