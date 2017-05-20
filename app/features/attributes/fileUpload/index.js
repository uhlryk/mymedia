import Settings from "./Settings.jsx";
import Form from "./Form.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class FileUploadAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("fileUpload");
    this.setDisplayName("file upload");
    this.setSettings(Settings);
    this.setEdit(Form);
    this.setCreate(Form);
    this.setView(View);
  }
}
