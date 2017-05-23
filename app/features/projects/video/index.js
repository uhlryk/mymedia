import FileProjectExtension from "../file/index";
import ProjectExtension from "../ProjectExtension";
import p from "bluebird";
import path from "path";
import { ipcRenderer } from "electron";

export default class extends FileProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "video", ProjectExtension.mergeConfiguration({
      displayName: "Video files",
      description: "Project for video files"
    }, configuration));
  }

  collectProjectFiles (files) {
    const FILE_EXTENSIONS = [".avi", ".mov", ".wmv", ".mkv", ".divx"];
    return files.filter(file => {
      const fileExtension = path.extname(file.name);
      return FILE_EXTENSIONS.includes(fileExtension);
    });
  }

  createProject () {
    super.createProject();
    this.createAttribute("video-duration-id", this.inputExtension.getName(), {
      displayName: "Duration"
    });
    this.createAttribute("video-width-id", this.inputExtension.getName(), {
      displayName: "Resolution Width"
    });
    this.createAttribute("video-height-id", this.inputExtension.getName(), {
      displayName: "Resolution Height"
    });
    this.createAttribute("video-framerate-id", this.inputExtension.getName(), {
      displayName: "Frame rate"
    });
  }

  mapFileProperties (file) {
    return super.mapFileProperties(file)
      .then(file => {
        return this.getMetadata (path.join(this.getManager().getRootManager().getStore().project.path, file.path))
          .then(metadata => Object.assign({}, file, {
            "video-duration-id": metadata.Duration,
            "video-width-id": metadata.ImageWidth,
            "video-height-id": metadata.ImageHeight,
            "video-framerate-id": metadata.FrameRate
          }))
      })
  }

  getMetadata (filepath) {
    return new p(resolve => {
      ipcRenderer.send("exif", filepath);
      ipcRenderer.once('exif-reply', (event, metadata) => {
        resolve(metadata.data[0]);
      })
    });
  }
}
