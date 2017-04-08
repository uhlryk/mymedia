import Edit from "./Edit.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class InputAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("tag");
    this.setDisplayName("tag");
    this.setEdit(Edit);
    this.setView(View);
  }
}
