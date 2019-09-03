import AttributeExtension from "../AttributeExtension.main";
import open from "open";
export default class extends AttributeExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "fileDropUpload", {}, ...configurations);
    this.setRequestRendererListener("open-resource", async filePath => {
      console.log("AAAA", filePath);
      open(filePath);
    });
  }

}
