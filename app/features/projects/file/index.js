import ProjectExtension from "../ProjectExtension";
import InputExtension from "../../formElements/input/index";
import TextAreaExtension from "../../formElements/textArea/index";
import RatingExtension from "../../formElements/rating/index";
import FileSize from "../../formElements/fileSize/index";
import Date from "../../formElements/date/index";

export default class extends ProjectExtension {
  constructor () {
    super("file");
  }

  init (manager) {
    super.init(manager);
    manager.registerExtension(new InputExtension());
    manager.registerExtension(new TextAreaExtension());
    manager.registerExtension(new RatingExtension());
    manager.registerExtension(new FileSize());
    manager.registerExtension(new Date());
  }

  onCreateProject () {
    super.onCreateProject();
    this.createFormElement("name-id", InputExtension.TYPE, {
      viewClassName: "file-list__name",
      alwaysVisible: true
    });

    this.createFormElement("path-id", InputExtension.TYPE, {
      viewClassName: "file-list__original-path",
      alwaysVisible: true,
      disableEdit: true
    });

    this.createFormElement("description-id", TextAreaExtension.TYPE, {
      displayName: "Description",
      viewClassName: "file-list__description"
    });

    this.createFormElement("file-size-id", FileSize.TYPE, {
      displayName: "Size"
    });
    this.createFormElement("create-date-id", Date.TYPE, {
      displayName: "Created"
    });
  }

  onFilterFiles (filteredFiles, initialFiles) {
    let files = filteredFiles || initialFiles;
    return files;
  }

  onListProjects (projects) {
    projects = projects || [];
    projects.push({
      extensionName: this.getName(),
      displayName: "Any files",
      description: "Project for various files"
    });
    return projects;
  }
}
