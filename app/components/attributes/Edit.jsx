import React from "react";
import classNames from "classnames";
import ValidationElementError from "../ValidationElementError.jsx";

export default class Edit extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    displayName: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    validation: React.PropTypes.string,
    attributeExtensionName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    settings: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onAttributeChange = this.onAttributeChange.bind(this);
  }

  onAttributeChange(evt) {
    if(this.props.settings.disableEdit === true) {
      return;
    }
    this.props.onChange(evt)
  }

  render() {
    let props = Object.assign({}, this.props.settings, { onChange: this.onAttributeChange, value: this.props.value });
    const className = classNames("form__group", {
      [this.props.settings.editClassName]: !!this.props.settings.editClassName
    });
    const extension = this.context.extensions.attributes.getExtension(this.props.attributeExtensionName);
    if(this.props.settings.disableEdit || extension.isOnlyProjectExtensionUse()) {
      return false;
    }
    return (
      <div className={className}>
        <label>{this.props.displayName}</label>
        {extension.getEdit(props)}
        <ValidationElementError error={this.props.validation} />
      </div>
    );
  }
}

