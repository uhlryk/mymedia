import Settings from "./Settings.jsx";
import Form from "./Form.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class FileDropUploadAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("fileDropUpload");
    this.setDisplayName("file drop upload");
    this.setSettings(Settings);
    this.setEdit(Form);
    this.setCreate(Form);
    this.setView(View);
  }
}
