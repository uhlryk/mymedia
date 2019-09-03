import React from "react";
import Extension from "../Extension.renderer";
export default class AttributesExtension extends Extension {
  constructor (extensionName, ...configurations) {
    super(extensionName, {
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
        attributes: [{
          id: "displayName",
          extensionName: "input",
          displayName: "Display name",
          placeholder: "Enter name",
          create: {}
        }]
      },
      sort: {

      }
    }, ...configurations);
  }

  getComponent(componentType) {
    if (this.getConfig()[componentType].component) {
      return this.getConfig()[componentType].component;
    } else {
      return () => false;
    }
  }

  getSettings () {
    return this._configuration.settings;
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

  async onBeforeCreate (value, attribute, resource) {
    return value;
  }

  async onBeforeUpdate (value, attribute, resource) {
    return value;
  }

  async onAfterCreate (value, attribute, resource) {
    return value;
  }

  async onAfterUpdate (value, attribute, resource) {
    return value;
  }

}
