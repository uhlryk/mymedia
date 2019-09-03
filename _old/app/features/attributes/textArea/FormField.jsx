import React from "react";

export default class FormField extends React.Component {
  static propsTypes = {
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    defaultValue: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange (evt) {
    this.props.onChange(evt.target.value);
  }

  render() {
    let value = this.props.value || this.props.defaultValue || "";
    return (
      <textarea
        rows="3"
        className="form__element"
        placeholder={this.props.placeholder}
        value={value}
        disabled={this.props.disabled}
        onChange={this.onChange}
      />
    );
  }
}
