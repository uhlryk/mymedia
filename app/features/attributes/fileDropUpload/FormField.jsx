import React from "react";
import DropFile from "./DropFile";

export default class FormField extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    uploadPath: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    console.log(props)
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: this.props.value || null
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.value !== nextProps.value) {
      this.setState((prevState, props) => ({
        value: props.value || null
      }));
    }
  }

  onChange(file) {
    console.log(file);
    this.props.onChange(file.name);
  }

  render() {
    return (
      <DropFile
        label={this.props.label}
        value={this.state.value}
        disabled={this.props.disabled}
        onChange={this.onChange}
      />
    );
  }
}
