import React from "react";
import classNames from "classnames";

export default class View extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    type: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object
  }
  render() {
    let value = this.props.value || (this.props.settings && this.props.settings.defaultValue);
    if(!value) return false;
    var props = Object.assign({}, this.props.settings, { value });

    const className = classNames("file-list__element", {
      [this.props.settings.viewClassName]: !!this.props.settings.viewClassName
    });

    return (
      <div className={className}>
        <small>{this.props.name}</small>
        {this.context.extensions.getFormElements().getExtension(this.props.type).getView(props)}
      </div>
    );
  }
}
