import Extensioner from "extensioner";
import _ from "lodash";

export default class Extension extends Extensioner.Extension {

  constructor(extensionName, ...configurations) {
    super();
    this.setName(extensionName);
    this.setConfig(...configurations);
  }

  setConfig(...configurations) {
    this._configuration = Extension.mergeConfiguration(...configurations);
  }

  getConfig() {
    return this._configuration;
  }

  static mergeConfiguration(...configurations) {
    return configurations.reduce((result, config) => {
      if (!result) {
        return config;
      } else {
        return _.mergeWith(result, config, (objValue, srcValue) => {
          if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
          }
        });
      }
    })

  }
}
