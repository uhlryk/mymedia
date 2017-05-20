import Settings from "./Settings.jsx";
import Form from "./Form.jsx";
import View from "./View.jsx";
import NumberAttributesExtension from "../number/index";

export default class RatingAttributesExtension extends NumberAttributesExtension {
  constructor () {
    super();
    this.setName ("rating");
    this.setDisplayName("rating");
    this.setSettings(Settings);
    this.setEdit(Form);
    this.setCreate(Form);
    this.setView(View);
  }
}
