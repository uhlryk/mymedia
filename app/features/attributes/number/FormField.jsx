import React from "react";

export default class FormField extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    defaultValue: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: this.props.value || this.props.defaultValue || 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.value !== nextProps.value) {
      this.setState((prevState, props) => ({
        value: props.value || ""
      }));
    }
  }

  onChange (evt) {
    this.props.onChange(evt.target.value);
  }

  render() {
    return (
      <input
        type="number"
        className="form__element"
        value={this.state.value}
        disabled={this.props.disabled}
        onChange={this.onChange}
      />
    );
  }
}
