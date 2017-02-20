import React from "react";

export default class FormElement extends React.Component {
  static propsTypes = {
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string
  };
  render() {
    let value = this.props.value || this.props.defaultValue || "";
    return (
      <input
        type="text"
        className="form__element"
        placeholder={this.props.placeholder}
        value={value}
        onChange={this.props.onChange}
      />
    );
  }
}
