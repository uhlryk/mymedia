import React from "react";
import BaseExtension from "../BaseExtension";
import FormElementsExtensionManager from "./FormElementsExtensionManager";
export default class FormElementsExtension extends BaseExtension {

  constructor () {
    super();
    this.setType(FormElementsExtensionManager.TYPE);
    this.SettingsComponent = () => false;
    this.EditComponent = () => false;
    this.ViewComponent = () => false;
    this.onlyProjectExtensionUse = false;
  }
  setOnlyProjectExtensionUse() {
    this.onlyProjectExtensionUse = true;
  }

  isOnlyProjectExtensionUse() {
    return this.onlyProjectExtensionUse;
  }
  setDisplayName (displayName) {
    this.displayName = displayName;
  }
  getDisplayName () {
    return this.displayName;
  }
  setSettings (Settings) {
    this.SettingsComponent = React.createFactory(Settings);
  }
  getSettings (props) {
    return this.SettingsComponent(props);
  }
  setEdit (Edit) {
    this.EditComponent = React.createFactory(Edit);
  }
  getEdit (props) {
    return this.EditComponent(props);
  }
  setView (View) {
    this.ViewComponent = React.createFactory(View);
  }
  getView (props) {
    return this.ViewComponent(props);
  }
}
