import ProjectsExtension from "../ProjectsExtension";

export default class extends ProjectsExtension {
  constructor () {
    super();
    this.setDisplayName("file");
    this.setName("file");
    this.setDescription("Any files");
  }
}
