import ProjectExtension from "../ProjectExtension";
import path from "path";
import InputExtension from "../../attributes/input/index";
import TextAreaExtension from "../../attributes/textArea/index";
import RatingExtension from "../../attributes/rating/index";
import FileSize from "../../attributes/fileSize/index";
import Date from "../../attributes/date/index";
import Tag from "../../attributes/tag/index";
import HierarchicalTag from "../../attributes/hierarchicalTag/index";

export default class extends ProjectExtension {
  constructor () {
    super();
    this.setName("file");
    this.setDisplayName("Any files");
    this.setDescription("Project for various files");
  }

  init (manager) {
    super.init(manager);
    this.inputExtension = new InputExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.inputExtension);
    this.textAreaExtension = new TextAreaExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.textAreaExtension);
    this.ratingExtension = new RatingExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.ratingExtension);
    this.fileSizeExtension = new FileSize();
    this.getManager().getRootManager().attributes.registerExtension(this.fileSizeExtension);
    this.dateExtension = new Date();
    this.getManager().getRootManager().attributes.registerExtension(this.dateExtension);
    this.tagExtension = new Tag();
    this.getManager().getRootManager().attributes.registerExtension(this.tagExtension);
    this.hierarchicalTagExtension = new HierarchicalTag();
    this.getManager().getRootManager().attributes.registerExtension(this.hierarchicalTagExtension);
  }

  createProject () {
    super.createProject();
    this.createAttribute("name-id", this.inputExtension.getName(), {
      viewClassName: "file-list__name",
      alwaysVisible: true
    });

    this.createAttribute("path-id", this.hierarchicalTagExtension.getName(), {
      viewClassName: "file-list__original-path",
      alwaysVisible: true
    });

    this.createAttribute("description-id", this.textAreaExtension.getName(), {
      displayName: "Description",
      viewClassName: "file-list__description"
    });

    this.createAttribute("file-size-id", this.fileSizeExtension.getName(), {
      displayName: "Size"
    });

    this.createAttribute("create-date-id", this.dateExtension.getName(), {
      displayName: "Created"
    });
  }

  mapFileProperties (file) {
    return super.mapFileProperties(file)
      .then(file => Object.assign({}, file, {
        "name-id": file.name,
        "path-id": this.convertPathToFolderArray(file.path),
        "file-size-id": file.stat.size,
        "create-date-id": file.stat.birthtime
      }));
  }

  convertPathToFolderArray (filePath) {
    console.log("AAA", filePath, filePath.split(path.sep), filePath.split(path.sep).slice(0,-1));
    return filePath.split(path.sep).slice(0,-1);
  }
}
