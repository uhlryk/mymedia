import React from "react";
import classNames from "classnames";

export default class View extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    value: React.PropTypes.any.isRequired,
    attribute: React.PropTypes.object
  }
  render() {
    let value = this.props.value || (this.props.attribute && this.props.attribute.defaultValue);
    if(!value) return false;
    var attributeOptions = Object.assign({}, this.props.attribute, { value });

    const className = classNames("file-list__element", {
      [this.props.attribute.viewClassName]: !!this.props.attribute.viewClassName
    });
    return (
      <div className={className}>
        <small>{this.props.attribute.disableViewDisplayName ? "" : this.props.attribute.displayName}</small>
        {this.context.extensions.attributes.getExtensions().find(extension => extension.getName() === this.props.attribute.extensionName).getView(attributeOptions)}
      </div>
    );
  }
}
