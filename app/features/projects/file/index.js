import ProjectExtension from "../ProjectExtension";
import InputExtension from "../../attributes/input/index";
import TextAreaExtension from "../../attributes/textArea/index";
import RatingExtension from "../../attributes/rating/index";
import FileSize from "../../attributes/fileSize/index";
import Date from "../../attributes/date/index";

export default class extends ProjectExtension {
  constructor () {
    super();
    this.setName("file");
    this.setDisplayName("Any files");
    this.setDescription("Project for various files");
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
    this.createAttribute("name-id", InputExtension.TYPE, {
      viewClassName: "file-list__name",
      alwaysVisible: true
    });

    this.createAttribute("path-id", InputExtension.TYPE, {
      viewClassName: "file-list__original-path",
      alwaysVisible: true,
      disableEdit: true
    });

    this.createAttribute("description-id", TextAreaExtension.TYPE, {
      displayName: "Description",
      viewClassName: "file-list__description"
    });

    this.createAttribute("file-size-id", FileSize.TYPE, {
      displayName: "Size"
    });
    this.createAttribute("create-date-id", Date.TYPE, {
      displayName: "Created"
    });
  }

  collectProjectFiles (files) {
    return files;
  }
}
