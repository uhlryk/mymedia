import React from "react";
import classNames from "classnames";
import resolveValue from "../../helpers/resolveValue";

export default class View extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    value: React.PropTypes.any.isRequired,
    attribute: React.PropTypes.object
  }
  render() {
    const value = resolveValue(this.props.value, this.props.attribute.defaultValue, undefined);
    if(value === undefined) return false;
    var props = Object.assign({}, this.props.attribute, { value });

    const attributeClassName = this.props.attribute.view.className ||  this.props.attribute.className || undefined;
    const className = classNames("file-list__element", attributeClassName);
    const extension = this.context.extensions.attributes.getExtensionByName(this.props.attribute.extensionName);

    if(this.props.attribute.view.hidden || !extension.hasView()) {
      return false;
    }
    const displayName = this.props.attribute.view.displayName !== undefined ? this.props.attribute.view.displayName : this.props.attribute.displayName;
    console.log("ZZ1", extension);
    return (
      <div className={className}>
        {displayName? <label>{displayName}</label> : null}
        {extension.getView(props)}
      </div>
    );
  }
}
