import FormField from "./FormField.jsx";
import View from "./View.jsx";
import AttributesExtension from "../AttributesExtension";

import path from "path";
import fse from "fs-extra";

export default class FileDropUploadAttributesExtension extends AttributesExtension {
  static fileStatus = {
    BEFORE_UPLOAD: "before_upload",
    UPLOADED: "uploaded",
    BEFORE_DELETE: "before_delete"
  }

  constructor (extensionName = null, configuration = {}) {
    super(extensionName || "fileDropUpload", AttributesExtension.mergeConfiguration({
      view: {
        component: View
      },
      settings: {
        displayName: "file drop upload",
        attributes: [{
          name: "label",
          extensionName: "input",
          displayName: "Label",
          placeholder: "Enter label",
          create: {}
        }, {
          name: "singleFile",
          extensionName: "checkbox",
          displayName: "Single file ",
          editLabel: "Allow only single file",
          viewLabel: "Allow only single file",
          create: {}
        }]
      },
      edit: {
        component: FormField
      },
      create: {
        component: FormField
      }
    }, configuration));
  }

  async onBeforeCreate (files, attribute, resource) {
    if (files) {
      const newFiles = [];
      for (const fileData of files) {
        const file = fileData.file;
        if (file) {
          const project = this.getManager().getRootManager().getStore().getState().project;
          const projectPath = project.path;
          const resourcePath = path.join(projectPath, resource.id);
          const srcFilePath = file.path;

          const targetFilePath = path.join(resourcePath, fileData.id);
          await fse.copy(srcFilePath, targetFilePath);
          newFiles.push({
            id: fileData.id,
            name: file.name,
            path: targetFilePath,
            status: FileDropUploadAttributesExtension.fileStatus.UPLOADED
          });
        } else if(fileData.status === FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE) {
          await fse.remove(fileData.path);
        } else {
          newFiles.push(fileData);
        }
      }
      return newFiles;
    } else {
      return files;
    }
  }

  async onBeforeUpdate (files, attribute, resource) {
    return await this.onBeforeCreate(files, attribute, resource);
  }

}
