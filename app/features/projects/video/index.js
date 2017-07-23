import FileProjectExtension from "../file/index";
import ImageGalleryExtension from "../../attributes/imageGallery/index";
import ImageExtension from "../../attributes/image/index";
import ProjectExtension from "../ProjectExtension";
import asyncIpcMessage from "../../../helpers/asyncIpcMessage";
import getFileList from "../../../helpers/getFileList";
import path from "path";
import fse from "fs-extra";
import { ipcRenderer } from "electron";
import Listing from "./Listing";

export default class extends FileProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "video", ProjectExtension.mergeConfiguration({
      displayName: "Video files",
      description: "Project for video files",
      listing: {
        component: Listing
      }
    }, configuration));
  }

  init (manager) {
    super.init(manager);
    this.imageGalleryExtension = new ImageGalleryExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.imageGalleryExtension);
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
    this.createAttribute("thumbnail-gallery-id", this.imageGalleryExtension.getName(), {
      displayName: "Video thumbnails",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });
    this.createAttribute("avatar-image-id", this.imageExtension.getName(), {
      displayName: null,
      view: {
        displayName: null,
        hidden: true
      },
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
      const videoDuration = metadata.Duration || metadata.MediaDuration || metadata.PlayDuration;
      console.log(metadata);
      Object.assign(modifiedResource, {
        "video-duration-id": videoDuration,
        "video-width-id": metadata.ImageWidth,
        "video-height-id": metadata.ImageHeight,
        "video-framerate-id": metadata.FrameRate
      });
      const framesNumber = 6;
      const imageGalleryId = "thumbnail-gallery-id";
      const targetGalleryAttributeDirPath = path.join(resourcePath, imageGalleryId);
      await asyncIpcMessage("shell", "ffmpeg", ["-i", filePath, "-vf", `fps=1/${videoDuration/framesNumber}`, path.join(targetGalleryAttributeDirPath, "frame%d.png")]);
      const frames = await getFileList(targetGalleryAttributeDirPath);

      Object.assign(modifiedResource, {
        [imageGalleryId]: frames.map(frame => ({
          name: frame.name,
          path: path.join(modifiedResource.id, imageGalleryId, frame.path)
        })),
      });
      if(frames[0]) {
        const avatarId = "avatar-image-id";
        const targetAvatarAttributeDirPath = path.join(resourcePath, avatarId, frames[0].name);
        await fse.copy(path.join(targetGalleryAttributeDirPath, frames[0].name), targetAvatarAttributeDirPath);
        Object.assign(modifiedResource, {
          [avatarId]: [{
            name: frames[0].name,
            path: path.join(modifiedResource.id, avatarId, frames[0].name)
          }]
        });
      }
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
