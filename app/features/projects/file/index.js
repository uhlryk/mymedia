import ProjectExtension from "../ProjectExtension";
import path from "path";
import InputExtension from "../../attributes/input/index";
import TextAreaExtension from "../../attributes/textArea/index";
import RatingExtension from "../../attributes/rating/index";
import FileSize from "../../attributes/fileSize/index";
import Date from "../../attributes/date/index";
import Tag from "../../attributes/tag/index";
import HierarchicalTag from "../../attributes/hierarchicalTag/index";
import FileDropUpload from "../../attributes/fileDropUpload/index";

export default class extends ProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "file", ProjectExtension.mergeConfiguration({
      displayName: "Any files",
      description: "Project for various files"
    }, configuration));
    this.mapFileProperties = this.mapFileProperties.bind(this);
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
    this.fileDropUploadExtension = new FileDropUpload();
    this.getManager().getRootManager().attributes.registerExtension(this.fileDropUploadExtension);
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
      displayName: "File name",
      view: {
        displayName: null,
        className: "file-list__name",
        listing: true
      }
    });

    this.createAttribute("file-resource-id", this.fileDropUploadExtension.getName(), {
      label: "some file"
    });

    this.createAttribute("path-id", this.hierarchicalTagExtension.getName(), {
      displayName: "File path",
      view: {
        displayName: null,
        className: "file-list__original-path",
        listing: true
      }
    });

    this.createAttribute("description-id", this.textAreaExtension.getName(), {
      displayName: "Description",
      view: {
        className: "file-list__description",
      },
      sort: {
        disabled: true
      }
    });

    this.createAttribute("file-size-id", this.fileSizeExtension.getName(), {
      displayName: "Size"
    });

    this.createAttribute("create-date-id", this.dateExtension.getName(), {
      displayName: "Created"
    });

    this.createAttribute("original-name-id", this.inputExtension.getName(), {
      displayName: "Original name",
      edit: {
        disabled: true
      },
      create: {
        disabled: true
      }
    });
  }

  async mapFileProperties (file) {
    file = await super.mapFileProperties(file);

    return Object.assign({}, file, {
      "name-id": file.name,
      "path-id": this.convertPathToFolderArray(file.path),
      "file-size-id": file.stat.size,
      "create-date-id": file.stat.birthtime,
      "original-name-id": file.name
    });
  }

  convertPathToFolderArray (filePath) {
    return filePath.split(path.sep).slice(0,-1);
  }
}
