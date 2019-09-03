import React from "react";
import { addNewAttributeWithId } from "../../actions/attributes";
import Extension from "../Extension.renderer";
export default class ProjectExtension extends Extension {
  constructor(extensionName, ...configurations) {
    super(extensionName, {
      listing: {
        set component(val) {
          this._component = React.createFactory(val);
        },
        get component() {
          return this._component;
        }
      },
    }, ...configurations);
  }

  getComponent(componentType) {
    if (this.getConfig()[componentType].component) {
      return this.getConfig()[componentType].component;
    } else {
      return () => false;
    }
  }

  getListing (props) {
    return this.getComponent("listing")(Object.assign({}, props, { extension: this}));
  }

  createProject (response, initialValue) {}
  collectProjectFiles (files) {
    return files;
  }

  createAttribute (id, extensionName, settings) {
    this.getManager().getRootManager().getStore().dispatch(
      addNewAttributeWithId(id, extensionName, settings)
    )
  }

  async onBeforeUpdate (modifiedResource) {
    return modifiedResource;
  }

  async onPostBeforeUpdate (modifiedResource) {
    return modifiedResource;
  }

  async onBeforeCreate (modifiedResource) {
    return modifiedResource;
  }

  async onPostBeforeCreate (modifiedResource) {
    return modifiedResource;
  }

  async onAfterUpdate (resourceId) {

  }

  async onAfterCreate (resourceId) {

  }

}
