import FileProjectExtension from "../file/index";

export default class extends FileProjectExtension {
  constructor () {
    super();
    this.clearRules();
    this.setDisplayName("video");
    this.setName("video");
    this.setDescription("Any video files");

    this.addFileExtension(".mp4");
    this.addFileExtension(".wmv");
    this.addFileExtension(".avi");
  }

}
