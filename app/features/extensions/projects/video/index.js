import ProjectsExtension from "../ProjectsExtension";

export default class extends ProjectsExtension {
  constructor () {
    super();
    this.setDisplayName("video");
    this.setName("video");
    this.setDescription("Any video files");

    this.addFileExtension(".mp4");
    this.addFileExtension(".wmv");
    this.addFileExtension(".avi");
  }
}
