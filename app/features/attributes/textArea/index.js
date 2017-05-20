import Settings from "./Settings.jsx";
import Form from "./Form.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class TextAreaAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("textArea");
    this.setDisplayName("text area");
    this.setSettings(Settings);
    this.setEdit(Form);
    this.setCreate(Form);
    this.setView(View);
  }

  getQuickSearchFunction (search) {
    return (value) => {
      return String(value).toLowerCase().includes(search.toLowerCase());
    }
  }
}
