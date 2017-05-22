import React from "react";
import Extensioner from "extensioner";
import _ from "lodash";
export default class AttributesExtension extends Extensioner.Extension {
  constructor (extensionName, configuration = {}) {
    super();
    this.setName (extensionName);
    this.setConfig(configuration);

    // this.SettingsComponent = () => false;
    // this.EditComponent = () => false;
    // this.CreateComponent = () => false;
    // this.ViewComponent = () => false;
    // this.onlyProjectExtensionUse = false;
  }

  setConfig(configuration) {
    this._configuration = AttributesExtension.mergeConfiguration({
      edit: {
        component: null
      },
      view: {
        component: null
      },
      create: {
        component: null
      },
      settings: {
        component: null
      },
      sort: {

      }
    }, configuration);
  }


  getConfig() {
    return this._configuration;
  }

  getComponent(coponentType) {
    if (this.getConfig()[coponentType].component) {
      return this.getConfig()[coponentType].component;
    } else {
      return () => false;
    }
  }


  // setOnlyProjectExtensionUse() {
  //   this.onlyProjectExtensionUse = true;
  // }
  //
  // isOnlyProjectExtensionUse() {
  //   return this.onlyProjectExtensionUse;
  // }
  // disableSortable() {
  //   this._disableSortable = true;
  // }
  // enableSortable() {
  //   this._disableSortable = false;
  // }
  // isSortableDisabled() {
  //   return this._disableSortable;
  // }
  // setDisplayName (displayName) {
  //   this.displayName = displayName;
  // }
  // getDisplayName () {
  //   return this.displayName;
  // }
  // setSettings (Settings) {
  //   this.SettingsComponent = React.createFactory(Settings);
  // }
  getSettings (props) {
    return this.getComponent("settings")(Object.assign({}, props, { extension: this}));
  }
  // setEdit (Edit) {
  //   this.EditComponent = React.createFactory(Edit);
  // }
  getEdit (props) {
    return this.getComponent("edit")(Object.assign({}, props, { extension: this}));
  }

  // setCreate (Create) {
  //   this.CreateComponent = React.createFactory(Create);
  // }

  getCreate (props) {
    return this.getComponent("create")(Object.assign({}, props, { extension: this}));
  }

  // setView (View) {
  //   this.ViewComponent = React.createFactory(View);
  // }
  getView (props) {
    return this.getComponent("view")(Object.assign({}, props, { extension: this}));
  }

  getSortFunction (order) {
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

  getQuickSearchFunction (search) {
    return (value) => {
      return false;
    }
  }

  static mergeConfiguration(source, target) {
    return _.merge(source, target);
  }
}
