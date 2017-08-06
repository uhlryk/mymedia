import ProjectExtension from "../ProjectExtension.main";

import * as InputExtension from "../../attributes/input/index";
import * as NumberExtension from "../../attributes/number/index";
import * as CheckboxExtension from "../../attributes/checkbox/index";
import * as TextAreaExtension from "../../attributes/textArea/index";
import * as RatingExtension from "../../attributes/rating/index";
import * as FileSize from "../../attributes/fileSize/index";
import * as Date from "../../attributes/date/index";
import * as Tag from "../../attributes/tag/index";
import * as HierarchicalTag from "../../attributes/hierarchicalTag/index";
import * as FileDropUpload from "../../attributes/fileDropUpload/index";

export default class extends ProjectExtension {
  constructor (extensionName, ...configurations) {
    super(extensionName || "file", {}, ...configurations);
  }
  init (manager) {
    super.init(manager);
    this.getManager().registerExtension(new InputExtension.MainAttributeExtension());
    this.getManager().registerExtension(new NumberExtension.MainAttributeExtension());
    this.getManager().registerExtension(new CheckboxExtension.MainAttributeExtension());
    this.getManager().registerExtension(new TextAreaExtension.MainAttributeExtension());
    this.getManager().registerExtension(new RatingExtension.MainAttributeExtension());
    this.getManager().registerExtension(new FileSize.MainAttributeExtension());
    this.getManager().registerExtension(new Date.MainAttributeExtension());
    this.getManager().registerExtension(new Tag.MainAttributeExtension());
    this.getManager().registerExtension(new HierarchicalTag.MainAttributeExtension());
    this.getManager().registerExtension(new FileDropUpload.MainAttributeExtension());
  }
}
