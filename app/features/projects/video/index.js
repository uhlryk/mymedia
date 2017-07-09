import FileProjectExtension from "../file/index";
import ProjectExtension from "../ProjectExtension";
import asyncIpcMessage from "../../../helpers/asyncIpcMessage";
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
    const project = this.getManager().getRootManager().getStore().getState().project;
    const projectPath = project.path;
    const resourcePath = path.join(projectPath, modifiedResource.id);
    modifiedResource = await super.onPostBeforeCreate(modifiedResource);
    if (modifiedResource["file-resource-id"] && modifiedResource["file-resource-id"][0]) {
      const filePath = path.join(projectPath, modifiedResource["file-resource-id"][0].path);
      const metadata = await this.getMetadata(filePath);
      Object.assign(modifiedResource, {
        "video-duration-id": metadata.Duration,
        "video-width-id": metadata.ImageWidth,
        "video-height-id": metadata.ImageHeight,
        "video-framerate-id": metadata.FrameRate
      })
      await asyncIpcMessage("shell", `ffmpeg -i ${filePath} -ss 00:00:14.435 -vframes 1 ${path.join(resourcePath, "frame.png")}`)
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
