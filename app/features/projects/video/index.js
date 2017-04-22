import FileProjectExtension from "../file/index";
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
    this.getMetadata(path.join(this.getManager().getRootManager().getStore().project.path, file.path));
    return Object.assign({}, super.mapFileProperties(file), {

    });
  }

  getMetadata (filepath) {
    ipcRenderer.send("shell", "ffprobe -v quiet -print_format json -show_format " + filepath);
    ipcRenderer.on('shell-reply', (event, error, stdout, stderr) => {
      let metadata = JSON.parse(stdout);
      console.log("duration", metadata.format.duration);
    })
  }
}
