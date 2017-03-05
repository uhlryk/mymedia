import ProjectsExtension from "../ProjectsExtension";

export default class extends ProjectsExtension {
  constructor () {
    super();
    this.setDisplayName("documents");
    this.setName("document");
    this.setDescription("Any document files");

    this.addRule(".*");//all files
  }
}
