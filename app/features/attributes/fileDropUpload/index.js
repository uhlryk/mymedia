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

  constructor (extensionName, ...configurations) {
    super(extensionName || "fileDropUpload", {
      view: {
        component: View
      },
      settings: {
        displayName: "file drop upload",
        attributes: [{
          id: "label",
          extensionName: "input",
          displayName: "Label",
          placeholder: "Enter label",
          create: {}
        }, {
          id: "singleFile",
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
    }, ...configurations);
  }

  async onBeforeCreate (files, attribute, resource) {
    const project = this.getManager().getRootManager().getStore().getState().project;
    const projectPath = project.path;
    const resourcePath = path.join(projectPath, resource.id);
    const targetAttributeDirPath = path.join(resourcePath, attribute.id);
    if (!await fse.exists(targetAttributeDirPath)) {
      await fse.mkdir(targetAttributeDirPath);
    }
    if (files) {
      const newFiles = [];
      for (const fileData of files) {
        const file = fileData.file;
        if (file) {
          const srcFilePath = file.path;
          const targetFileDirPath = path.join(targetAttributeDirPath, fileData.id);
          await fse.mkdir(targetFileDirPath);
          const targetFilePath = path.join(targetFileDirPath, file.name);
          await fse.copy(srcFilePath, targetFilePath);
          newFiles.push({
            id: fileData.id,
            name: file.name,
            path: path.join(resource.id, attribute.id, fileData.id, file.name),
            status: FileDropUploadAttributesExtension.fileStatus.UPLOADED
          });
        } else if(fileData.status === FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE) {
          await fse.remove(path.join(resourcePath, fileData.id));
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
