import FileProjectExtension from "../file/index";
import ImageExtension from "../../attributes/image/index";
import ProjectExtension from "../ProjectExtension";
import asyncIpcMessage from "../../../helpers/asyncIpcMessage";
import getFileList from "../../../helpers/getFileList";
import path from "path";
import fse from "fs-extra";
import { ipcRenderer } from "electron";

export default class extends FileProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "video", ProjectExtension.mergeConfiguration({
      displayName: "Video files",
      description: "Project for video files"
    }, configuration));
  }

  init (manager) {
    super.init(manager);
    this.imageExtension = new ImageExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.imageExtension);
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
    this.createAttribute("video-frames-id", this.imageExtension.getName(), {
      displayName: "Frames",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });
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
    const project = this.getManager().getRootManager().getStore().getState().project;
    const projectPath = project.path;
    const resourcePath = path.join(projectPath, modifiedResource.id);
    if (modifiedResource["file-resource-id"] && modifiedResource["file-resource-id"][0]) {
      const filePath = path.join(projectPath, modifiedResource["file-resource-id"][0].path);
      const metadata = await this.getMetadata(filePath);
      const videoDuration = metadata.Duration;
      Object.assign(modifiedResource, {
        "video-duration-id": videoDuration,
        "video-width-id": metadata.ImageWidth,
        "video-height-id": metadata.ImageHeight,
        "video-framerate-id": metadata.FrameRate
      });
      const framesNumber = 6;
      const imageFrameId = "video-frames-id";
      const targetAttributeDirPath = path.join(resourcePath, imageFrameId);
      await asyncIpcMessage("shell", `ffmpeg -i ${filePath} -vf fps=1/${videoDuration/framesNumber} ${path.join(targetAttributeDirPath, "frame%d.png")}`);
      const frames = await getFileList(targetAttributeDirPath);
      Object.assign(modifiedResource, {
        [imageFrameId]: frames.map(frame => ({
          name: frame.name,
          path: path.join(modifiedResource.id, imageFrameId, frame.path)
        }))
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
