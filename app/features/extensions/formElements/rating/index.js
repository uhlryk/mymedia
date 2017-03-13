import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import FormElementsExtension from "../FormElementsExtension";


export default class RatingFormElementsExtension extends FormElementsExtension {
  static TYPE = "rating";
  constructor () {
    super();
    this.setDisplayName("rating");
    this.setName(RatingFormElementsExtension.TYPE);
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
