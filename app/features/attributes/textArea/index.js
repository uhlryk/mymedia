import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class TextAreaAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("textArea");
    this.setDisplayName("text area");
    this.setSettings(Settings);
    this.setEdit(FormField);
    this.setCreate(FormField);
    this.setView(View);
  }

  getQuickSearchFunction (search) {
    return (value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    }
  }
}
