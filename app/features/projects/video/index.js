import FileProjectExtension from "../file/index";
import ProjectExtension from "../ProjectExtension";
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
      displayName: "Duration",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });
    this.createAttribute("video-width-id", this.inputExtension.getName(), {
      displayName: "Resolution Width",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });
    this.createAttribute("video-height-id", this.inputExtension.getName(), {
      displayName: "Resolution Height",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });
    this.createAttribute("video-framerate-id", this.inputExtension.getName(), {
      displayName: "Frame rate",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });
  }

  async onPostBeforeCreate (modifiedResource) {
    modifiedResource = await super.onPostBeforeCreate(modifiedResource);
    if (modifiedResource["file-resource-id"] && modifiedResource["file-resource-id"][0]) {
      const metadata = await this.getMetadata(path.join(this.getManager().getRootManager().getStore().getState().project.path, modifiedResource["file-resource-id"][0].path));
      Object.assign(modifiedResource, {
        "video-duration-id": metadata.Duration,
        "video-width-id": metadata.ImageWidth,
        "video-height-id": metadata.ImageHeight,
        "video-framerate-id": metadata.FrameRate
      })
    }
    return modifiedResource
  }

  getMetadata (filepath) {
    return new Promise(resolve => {
      ipcRenderer.send("exif", filepath);
      ipcRenderer.once("exif-reply", (event, metadata) => {
        resolve(metadata.data[0]);
      })
    });
  }
}
