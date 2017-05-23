import React from "react";
import classNames from "classnames";
import ValidationElementError from "../ValidationElementError.jsx";

export default class Edit extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    value: React.PropTypes.any.isRequired,
    validation: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    attribute: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onAttributeChange = this.onAttributeChange.bind(this);
  }

  onAttributeChange(value) {
    if(this.props.attribute.edit.disabled) {
      return;
    }
    this.props.onChange(value)
  }

  render() {
    let props = Object.assign({}, this.props.attribute, {
      onChange: this.onAttributeChange,
      value: this.props.value,
      disabled: this.props.attribute.edit.disabled
    });
    const attributeClassName = this.props.attribute.edit.className ||  this.props.attribute.className || undefined;
    const className = classNames("form__group", attributeClassName);
    const extension = this.context.extensions.attributes.getExtensions().find(extension => extension.getName() === this.props.attribute.extensionName);
    if(this.props.attribute.edit.hidden || !extension.hasEdit()) {
      return false;
    }
    const displayName = this.props.attribute.create.displayName !== undefined ? this.props.attribute.create.displayName : this.props.attribute.displayName;
    return (
      <div className={className}>
        <label>{displayName}</label>
        {extension.getEdit(props)}
        <ValidationElementError error={this.props.validation} />
      </div>
    );
  }
}

