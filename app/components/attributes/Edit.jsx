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

  componentWillReceiveProps(nextProps) {
    console.log("Attributes.Edit.componentWillReceiveProps", nextProps);
  }

  onAttributeChange(evt) {
    console.log("Attributes.Edit.onAttributeChange");
    if(this.props.attribute.disableEdit === true) {
      return;
    }
    this.props.onChange(evt)
  }

  render() {
    let props = Object.assign({}, this.props.attribute, { onChange: this.onAttributeChange, value: this.props.value });
    console.log("Attributes.Edit.render", props);
    const className = classNames("form__group", {
      [this.props.attribute.editClassName]: !!this.props.attribute.editClassName
    });
    const extension = this.context.extensions.attributes.getExtensions().find(extension => extension.getName() === this.props.attribute.extensionName);
    if(this.props.attribute.disableEdit || extension.isOnlyProjectExtensionUse()) {
      return false;
    }
    return (
      <div className={className}>
        <label>{this.props.attribute.displayName}</label>
        {extension.getEdit(props)}
        <ValidationElementError error={this.props.validation} />
      </div>
    );
  }
}

