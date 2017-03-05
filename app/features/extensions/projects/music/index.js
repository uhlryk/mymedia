import ProjectsExtension from "../ProjectsExtension";

export default class extends ProjectsExtension {
  constructor () {
    super();
    this.setDisplayName("music");
    this.setName("music");
    this.setDescription("Any music files");

    this.addRule(".*");//all files
  }
}
