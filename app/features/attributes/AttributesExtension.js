import React from "react";
import Extensioner from "extensioner";
import _ from "lodash";
export default class AttributesExtension extends Extensioner.Extension {
  constructor (extensionName, configuration = {}) {
    super();
    this.setName (extensionName);
    this.setConfig(configuration);
  }

  setConfig(configuration) {
    this._configuration = AttributesExtension.mergeConfiguration({
      edit: {
        set component(val) {
          this._component = React.createFactory(val);
        },
        get component() {
          return this._component;
        }
      },
      view: {
        set component(val) {
          this._component = React.createFactory(val);
        },
        get component() {
          return this._component;
        }
      },
      create: {
        set component(val) {
          this._component = React.createFactory(val);
        },
        get component() {
          return this._component;
        }
      },
      settings: {
        set component(val) {
          this._component = React.createFactory(val);
        },
        get component() {
          return this._component;
        }
      },
      sort: {

      }
    }, configuration);
  }


  getConfig() {
    return this._configuration;
  }

  getComponent(componentType) {
    if (this.getConfig()[componentType].component) {
      return this.getConfig()[componentType].component;
    } else {
      return () => false;
    }
  }

  hasSettings () {
    return this.getConfig().settings.component;
  }
  getSettings (props) {
    return this.getComponent("settings")(Object.assign({}, props, { extension: this}));
  }

  hasEdit () {
    return this.getConfig().edit.component;
  }
  getEdit (props) {
    return this.getComponent("edit")(Object.assign({}, props, { extension: this}));
  }

  hasCreate () {
    return this.getConfig().create.component;
  }
  getCreate (props) {
    return this.getComponent("create")(Object.assign({}, props, { extension: this}));
  }

  hasView () {
    return this.getConfig().view.component;
  }
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

  async onBeforeCreate (value, attribute) {
    console.log("onBeforeCreate", value, attribute);
    return value;
  }

  async onBeforeUpdate (value, attribute) {
    console.log("onBeforeUpdate", value, attribute);
    return value;
  }

  static mergeConfiguration(source, target) {
    return _.merge(source, target);
  }
}
