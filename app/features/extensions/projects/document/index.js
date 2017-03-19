import FileProjectExtension from "../file/index";

export default class extends FileProjectExtension {
  constructor () {
    super();
    this.clearRules();
    this.setDisplayName("documents");
    this.setName("document");
    this.setDescription("Any document files");

    this.addRule(".*");//all files
  }
}
