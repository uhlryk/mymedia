import ProjectExtension from "../ProjectExtension.main";
import exiftool from "node-exiftool";
import exiftoolBin from "dist-exiftool";

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
    })
  }

}
