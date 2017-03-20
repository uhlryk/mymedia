import React from "react";
import classNames from "classnames";
import ValidationElementError from "../ValidationElementError.jsx";

export default class Edit extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    validation: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    settings: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onFormElementChange = this.onFormElementChange.bind(this);
  }

  onFormElementChange(evt) {
    if(this.props.settings.disableEdit === true) {
      return;
    }
    this.props.onChange(evt)
  }

  render() {
    let props = Object.assign({}, this.props.settings, { onChange: this.onFormElementChange, value: this.props.value });
    const className = classNames("form__group", {
      [this.props.settings.editClassName]: !!this.props.settings.editClassName
    });
    const extension = this.context.extensions.getFormElements().getExtension(this.props.type);
    if(this.props.settings.disableEdit || extension.isOnlyProjectExtensionUse()) {
      return false;
    }
    return (
      <div className={className}>
        <label>{this.props.name}</label>
        {extension.getEdit(props)}
        <ValidationElementError error={this.props.validation} />
      </div>
    );
  }
}

