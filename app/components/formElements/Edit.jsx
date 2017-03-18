import React from "react";
import classNames from "classnames";

export default class Edit extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
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
      [this.props.settings.className]: !!this.props.settings.className,
      "form__group--disabled-edit": this.props.settings.disableEdit
    });
    return (
      <div className={className}>
        <label>{this.props.name}</label>
        {this.context.extensions.getFormElements().getExtension(this.props.type).getEdit(props)}
      </div>
    );
  }
}

