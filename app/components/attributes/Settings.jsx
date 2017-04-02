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
    return (
      <div>
        {this.context.extensions.attributes.getExtensions().find(extension => extension.getName === this.props.attributeExtensionName).getSettings(this.props)}
      </div>
    );
  }
}
