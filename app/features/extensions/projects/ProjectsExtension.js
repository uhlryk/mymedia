import React from "react";
import BaseExtension from "../BaseExtension";
import ProjectsExtensionManager from "./ProjectsExtensionManager";
import path from "path";

export default class ProjectsExtension extends BaseExtension {

  constructor () {
    super();
    this.rules = [];
    this.fileExtensions = [];
    this.setType(ProjectsExtensionManager.TYPE);
  }
  setDisplayName (displayName) {
    this.displayName = displayName;
  }
  getDisplayName () {
    return this.displayName;
  }
  setDescription (description) {
    this.description = description;
  }
  getDescription () {
    return this.description;
  }
  addFileExtension (fileExtension) {
    if (!this.fileExtensions.includes(fileExtension)) {
      this.fileExtensions.push(fileExtension);
    }
  }
  addRule (rule) {
    if (!this.rules.includes(rule)) {
      this.rules.push(rule);
    }
  }
  clearRules () {
    this.rules = [];
  }

  isFileSupported (fileName) {
    const fileExtension = path.extname(fileName);
    return this.fileExtensions.includes(fileExtension) || (this.rules.some(rule => rule.test(fileName)));
  }

  registerExtensions (registerExtension) {
  }

  onCreate (createFormElement) {
    console.log(`project ${this.getName()} created`);
  }

  mapFileProperties (file) {
    return file;
  }
}
