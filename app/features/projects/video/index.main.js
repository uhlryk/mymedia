import ProjectExtension from "../ProjectExtension.main";
import exiftool from "node-exiftool";
import exiftoolBin from "dist-exiftool";
import * as ImageGalleryExtension from "../../attributes/imageGallery/index";
import * as ImageExtension from "../../attributes/image/index";

export default class extends ProjectExtension {

  constructor (extensionName, ...configurations) {
    super(extensionName || "video", {}, ...configurations);
    this.setRequestRendererListener("file-info", async filePath => {
      const ep = new exiftool.ExiftoolProcess(exiftoolBin);
      return ep
        .open()
        .then((pid) => console.log("Started exiftool process %s", pid))
        .then(() => ep.readMetadata(filePath, ["n"]))
        .then(metadata => {
          ep.close();
          return metadata.data[0];
        })
        .catch(console.error)
    });
  }

  init (manager) {
    super.init(manager);
    this.getManager().registerExtension(new ImageGalleryExtension.MainAttributeExtension());
    this.getManager().registerExtension(new ImageExtension.MainAttributeExtension());
  }

}
