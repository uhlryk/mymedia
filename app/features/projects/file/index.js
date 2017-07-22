import ProjectExtension from "../ProjectExtension";
import path from "path";
import InputExtension from "../../attributes/input/index";
import NumberExtension from "../../attributes/number/index";
import CheckboxExtension from "../../attributes/checkbox/index";
import TextAreaExtension from "../../attributes/textArea/index";
import RatingExtension from "../../attributes/rating/index";
import FileSize from "../../attributes/fileSize/index";
import Date from "../../attributes/date/index";
import Tag from "../../attributes/tag/index";
import HierarchicalTag from "../../attributes/hierarchicalTag/index";
import FileDropUpload from "../../attributes/fileDropUpload/index";

import Listing from "./Listing";
import fse from "fs-extra";

export default class extends ProjectExtension {

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "file", ProjectExtension.mergeConfiguration({
      displayName: "Any files",
      description: "Project for various files",
      listing: {
        component: Listing
      }
    }, configuration));
  }

  init (manager) {
    super.init(manager);
    this.inputExtension = new InputExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.inputExtension);
    this.numberExtension = new NumberExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.numberExtension);
    this.checkboxExtension = new CheckboxExtension();
    this.getManager().getRootManager().attributes.registerExtension(this.checkboxExtension);
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
        className: "file-list__name"
      }
    });

    this.createAttribute("file-resource-id", this.fileDropUploadExtension.getName(), {
      displayName: "File resource",
      label: "some file"
    });

    // this.createAttribute("path-id", this.hierarchicalTagExtension.getName(), {
    //   displayName: "File path",
    //   view: {
    //     displayName: null,
    //     className: "file-list__original-path",
    //     listing: true
    //   }
    // });

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
      displayName: "Size",
      edit: {
        hidden: true
      },
      create: {
        hidden: true
      }
    });

    this.createAttribute("create-date-id", this.dateExtension.getName(), {
      displayName: "Created"
    });
  }

  async onBeforeCreate (modifiedResource) {
    modifiedResource = await super.onBeforeCreate(modifiedResource);
    const project = this.getManager().getRootManager().getStore().getState().project;
    const projectPath = project.path;
    await fse.mkdir(path.join(projectPath, modifiedResource.id));
    return modifiedResource;
  }

  async onPostBeforeCreate (modifiedResource) {
    modifiedResource = await super.onPostBeforeCreate(modifiedResource);
    const project = this.getManager().getRootManager().getStore().getState().project;
    const projectPath = project.path;
    if (modifiedResource["file-resource-id"] && modifiedResource["file-resource-id"][0]) {
      const stat = await fse.stat(path.join(projectPath, modifiedResource["file-resource-id"][0].path));
      modifiedResource["file-size-id"] = stat.size;
      modifiedResource["create-date-id"] = stat.birthtime;
      //const project = this.getManager().getRootManager().getStore().getState().project;
      //const projectPath = project.path;
      //modifiedResource["path-id"] = path.relative(projectPath, modifiedResource["file-resource-id"][0].path).split(path.sep).slice(0, -1);
    }
    return modifiedResource;
  }


  async onPostBeforeUpdate (files, attribute, resource) {
    return await this.onPostBeforeCreate(files, attribute, resource);
  }
}
