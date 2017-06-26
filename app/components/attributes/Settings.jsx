import React from "react";

export default class Settings extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    attributeExtensionName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  render() {
    let extension = this.context.extensions.attributes.getExtensionByName(this.props.attributeExtensionName);
    if(!extension.hasSettings()) {
      return false;
    }

    return (
      <div>
        {extension.getSettings(this.props)}
      </div>
    );
  }
}
