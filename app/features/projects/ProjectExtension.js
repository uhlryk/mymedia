import Extensioner from "extensioner";
export default class ProjectExtension extends Extensioner.Extension {
  constructor(name) {
    super(name);
  }

  init(manager) {
    super.init(manager);
    this.getManager().registerEventListener("CREATE_PROJECT", this.onCurrentProjectEvent.bind(this, this.onCreateProject));
    this.getManager().registerEventListener("FILTER_FILES", this.onCurrentProjectEvent.bind(this, this.onFilterFiles));
    this.getManager().registerEventListener("LIST_PROJECTS", this.onListProjects);

  }

  onCurrentProjectEvent(callback, prevResponse, props) {
    if (this.getCurrentProject() === this.getName()) {
      return callback(prevResponse, props);
    }
  }

  onCreateProject (response, initialValue) {}

  onFilterFiles (response, initialValue) {}

  onListProjects (response, initialValue) {}

  createFormElement (id, extensionName, settings) {
    this.getManager().getStore().dispatch(
      addNewElementWithId(id, extensionName, settings)
    )
  }
  getCurrentProject() {
    return this.getManager().this.getStore().project.extensionName;
  }
}
