import FileProjectExtension from "../file/index";
import p from "bluebird";
import path from "path";
import { ipcRenderer } from "electron";

export default class extends FileProjectExtension {
  constructor () {
    super();
    this.setName("video");
    this.setDisplayName("Video files");
    this.setDescription("Project for video files");
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
  }

  mapFileProperties (file) {
    return super.mapFileProperties(file)
      .then(file => {
        return this.getMetadata (path.join(this.getManager().getRootManager().getStore().project.path, file.path))
          .then(metadata => Object.assign({}, file, {
            "video-duration-id": metadata.duration
          }))
      })
  }

  getMetadata (filepath) {
    return new p(resolve => {
      ipcRenderer.send("shell", "ffprobe -v quiet -print_format json -show_format " + filepath);
      ipcRenderer.once('shell-reply', (event, error, stdout, stderr) => {
        let metadata = JSON.parse(stdout);
        resolve(metadata.format);
      })
    });
  }
}
