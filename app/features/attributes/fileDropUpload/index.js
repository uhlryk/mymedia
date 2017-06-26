import Settings from "./Settings.jsx";
import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";
import uuid from "uuid-v4";
import path from "path";
import fse from "fs-extra";

export default class FileDropUploadAttributesExtension extends AttributesExtension {
  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "fileDropUpload", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "file drop upload",
        component: Settings
      },
      edit: {
        component: FormField
      },
      create: {
        component: FormField
      }
    }, configuration));
  }

  async onBeforeCreate (file, attribute, resource) {
    console.log("onBeforeCreate fileDrop", file, attribute, resource);
    const project = this.getManager().getRootManager().getStore().getState().project;
    const projectPath = project.path;
    const resourcePath = path.join(projectPath, resource.id);
    const srcFilePath = file.path;
    const fileId = uuid();
    const targetFilePath = path.join(resourcePath, fileId);
    await fse.copy(srcFilePath, targetFilePath);
    return {
      id: fileId,
      name: file.name,
      path: targetFilePath
    };
  }

  async onBeforeUpdate (value, attribute, resource) {
    console.log("onBeforeUpdate fileDrop", value, attribute);
    return null;
  }

}
