import React from "react";
import Extensioner from "extensioner";
export default class AttributesExtension extends Extensioner.Extension {
  constructor () {
    super();
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
    return this.SettingsComponent(Object.assign({}, props, { extension: this}));
  }
  setEdit (Edit) {
    this.EditComponent = React.createFactory(Edit);
  }
  getEdit (props) {
    return this.EditComponent(Object.assign({}, props, { extension: this}));
  }
  setView (View) {
    this.ViewComponent = React.createFactory(View);
  }
  getView (props) {
    return this.ViewComponent(Object.assign({}, props, { extension: this}));
  }

  getSortFunction (attributeId, order) {
    return (a, b) => {
      if (order === "ASC") {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a < b) return 1;
        if (a > b) return -1;
      }
      return 0;
    };
  }
}
