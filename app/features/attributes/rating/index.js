import Settings from "./Settings.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class RatingAttributesExtension extends AttributesExtension {
  constructor () {
    super("rating");
    this.setDisplayName("rating");
    this.setSettings(Settings);
    this.setEdit(Edit);
    this.setView(View);
  }
}
