import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";

export default class extends FormElementsExtension {
  constructor () {
    super();
    this.setDisplayName("text area");
    this.setName("textArea");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
