import React from "react";

export default class FormField extends React.Component {
  static propsTypes = {
    editLabel: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    defaultValue: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: this.props.value || this.props.defaultValue || ""
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("A2", nextProps);
    if(this.state.value !== nextProps.value) {
      this.setState((prevState, props) => ({
        value: props.value || props.defaultValue || ""
      }));
    }
  }

  onChange (evt) {
    console.log("A1", evt.target.checked);
    this.props.onChange(evt.target.checked);
  }

  render() {
    return (
      <label className="form__special">
        <input
          type="checkbox"
          checked={this.state.value}
          disabled={this.props.disabled}
          onChange={this.onChange}
        />
        &nbsp;{this.props.editLabel}
      </label>
    );
  }
}
