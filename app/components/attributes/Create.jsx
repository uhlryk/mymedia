import React from "react";
import classNames from "classnames";
import ValidationElementError from "../ValidationElementError.jsx";

export default class Create extends React.Component {
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

  onAttributeChange(evt) {
    if(this.props.attribute.disableCreate === true) {
      return;
    }
    this.props.onChange(evt)
  }

  render() {
    let props = Object.assign({}, this.props.attribute, { onChange: this.onAttributeChange, value: this.props.value });
    const className = classNames("form__group", {
      [this.props.attribute.createClassName]: !!this.props.attribute.createClassName
    });
    const extension = this.context.extensions.attributes.getExtensions().find(extension => extension.getName() === this.props.attribute.extensionName);
    if(this.props.attribute.disableCreate || extension.isOnlyProjectExtensionUse()) {
      return false;
    }
    return (
      <div className={className}>
        <label>{this.props.attribute.displayName}</label>
        {extension.getCreate(props)}
        <ValidationElementError error={this.props.validation} />
      </div>
    );
  }
}

