import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class HierarchicalTagAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("hierarchicalTag");
    this.setView(View);
    this.setOnlyProjectExtensionUse();
  }
}
