import ProjectExtension from "../ProjectExtension";
import InputExtension from "../../extensions/formElements/input/index";
import TextAreaExtension from "../../extensions/formElements/textArea/index";
import RatingExtension from "../../extensions/formElements/rating/index";
import FileSize from "../../extensions/formElements/fileSize/index";
import Date from "../../extensions/formElements/date/index";

export default class extends ProjectExtension {
  constructor () {
    super("file");
  }

  init (manager) {
    super.init(manager);
    this.getManager().getRootManager().registerExtension(new InputExtension());
    this.getManager().getRootManager().registerExtension(new TextAreaExtension());
    this.getManager().getRootManager().registerExtension(new RatingExtension());
    this.getManager().getRootManager().registerExtension(new FileSize());
    this.getManager().getRootManager().registerExtension(new Date());
  }

  createProject () {
    super.createProject();
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

  collectProjectFiles (files) {
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
