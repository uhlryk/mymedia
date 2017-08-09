import FileProjectExtension from "../file/index.renderer";
import * as ImageGalleryExtension from "../../attributes/imageGallery/index";
import * as ImageExtension from "../../attributes/image/index";
import getFileList from "../../../helpers/getFileList";
import path from "path";
import fse from "fs-extra";
import Listing from "./Listing";

export default class extends FileProjectExtension {

  constructor (extensionName, ...configurations) {
    super(extensionName || "video", {
      displayName: "Video files",
      description: "Project for video files",
      listing: {
        component: Listing
      }
    }, ...configurations);
  }

  init (manager) {
    super.init(manager);
    this.imageGalleryExtension = new ImageGalleryExtension.RendererAttributeExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.imageGalleryExtension);
    this.imageExtension = new ImageExtension.RendererAttributeExtension();
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
    this.createAttribute("screenshots-gallery-id", this.imageGalleryExtension.getName(), {
      displayName: "Screenshots",
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
      // const metadata = await this.getMetadata(filePath);
      const metadata = await this.requestMainProcess("file-info", filePath);
      const videoDuration = metadata.Duration || metadata.MediaDuration || metadata.PlayDuration;
      Object.assign(modifiedResource, {
        "video-duration-id": videoDuration,
        "video-width-id": metadata.ImageWidth,
        "video-height-id": metadata.ImageHeight,
        "video-framerate-id": metadata.FrameRate
      });
      const imageGalleryId = "screenshots-gallery-id";
      const targetGalleryAttributeDirPath = path.join(resourcePath, imageGalleryId);
      await this.requestMainProcess("video-screenshots", filePath, videoDuration, targetGalleryAttributeDirPath);
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

}
