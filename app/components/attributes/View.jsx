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
    var props = Object.assign({}, this.props.attribute, { value });

    const attributeClassName = this.props.attribute.view.className ||  this.props.attribute.className || undefined;
    const className = classNames("file-list__element", attributeClassName);
    const extension = this.context.extensions.attributes.getExtensions().find(extension => extension.getName() === this.props.attribute.extensionName);

    if(this.props.attribute.view.hidden || !extension.hasView()) {
      return false;
    }
    const displayName = this.props.attribute.view.displayName !== undefined ? this.props.attribute.view.displayName : this.props.attribute.displayName;

    return (
      <div className={className}>
        <small>{displayName}</small>
        {extension.getView(props)}
      </div>
    );
  }
}
