import React from "react";

export default class Settings extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  render() {
    return (
      <div>
        {this.context.extensions.getFormElements().getExtension(this.props.type).getSettings(this.props)}
      </div>
    );
  }
}
