import FileProjectExtension from "../file/index";

export default class extends FileProjectExtension {
  constructor () {
    super();
    this.setDisplayName("music");
    this.setName("music");
    this.setDescription("Any music files");

    this.addRule(".*");//all files
  }
}
