import React from "react";
import BaseExtension from "../BaseExtension";
import ProjectsExtensionManager from "./ProjectsExtensionManager";
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
    if (this.fileExtensions.indexOf(fileExtension) === -1) {
      this.fileExtensions.push(fileExtension);
    }
  }
  addRule (rule) {
    if (this.rules.indexOf(rule) === -1) {
      this.rules.push(rule);
    }
  }
  isFileExtension (fileExtension) {
    return (this.fileExtensions.indexOf(fileExtension) === -1 ? false : true) || (rules.some(rule => rule.test(fileExtension)));
  }
}
