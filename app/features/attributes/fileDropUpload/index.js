import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

export default class FileDropUploadAttributesExtension extends AttributesExtension {
  constructor () {
    super();
    this.setName ("fileDropUpload");
    this.setDisplayName("file drop upload");
    this.setSettings(Settings);
    this.setEdit(FormField);
    this.setCreate(FormField);
    this.setView(View);
  }
}
