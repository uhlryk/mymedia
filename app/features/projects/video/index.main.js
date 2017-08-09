import ProjectExtension from "../ProjectExtension.main";
import path from "path";
import exiftool from "node-exiftool";
import exiftoolBin from "dist-exiftool";
import childProcess from "child_process";
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
    this.setRequestRendererListener("video-screenshots", async (filePath, videoDuration, targetGalleryAttributeDirPath) => {
      const framesNumber = 6;
      const command = childProcess.spawn("ffmpeg",  [
        "-i",
        filePath,
        "-vf",
        `fps=1/${videoDuration/framesNumber}`,
        path.join(targetGalleryAttributeDirPath, "frame%d.png")
      ]);
      return new Promise(resolve => {
        command.stdout.on("data", data => {
          console.log(`stdout: ${data}`);
        });

        command.stderr.on("data", err => {
          console.log(`stderr: ${err}`);
        });

        command.on("close", (code) => {
          console.log(`child process exited with code ${code}`);
          resolve();
        });
      });
    });
  }

  init (manager) {
    super.init(manager);
    this.getManager().registerExtension(new ImageGalleryExtension.MainAttributeExtension());
    this.getManager().registerExtension(new ImageExtension.MainAttributeExtension());
  }

}
