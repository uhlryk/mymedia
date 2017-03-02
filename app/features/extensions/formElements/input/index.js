import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";

export default class extends FormElementsExtension {
  constructor () {
    super();
    this.setDisplayName("input");
    this.setName("input");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
