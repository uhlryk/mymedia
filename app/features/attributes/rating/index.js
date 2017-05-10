import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";

export default class RatingAttributesExtension extends NumberAttributesExtension {
  constructor () {
    super();
    this.setName ("rating");
    this.setDisplayName("rating");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
