import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";

export default class InputFormElementsExtension extends FormElementsExtension {
  static TYPE = "input";
  constructor () {
    super();
    this.setDisplayName("input");
    this.setName(InputFormElementsExtension.TYPE);
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
