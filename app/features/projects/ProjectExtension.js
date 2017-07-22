import React from "react";
import { addNewAttributeWithId } from "../../actions/attributes";
import Extensioner from "extensioner";
export default class ProjectExtension extends Extensioner.Extension {
  constructor(extensionName, configuration = {}) {
    super();
    this.setName(extensionName);
    this.setConfig(configuration);
  }

  setConfig(configuration) {
    this._configuration = ProjectExtension.mergeConfiguration({
      listing: {
        set component(val) {
          this._component = React.createFactory(val);
        },
        get component() {
          return this._component;
        }
      },
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

  static mergeConfiguration(source, target) {
    return _.merge(source, target);
  }
}
