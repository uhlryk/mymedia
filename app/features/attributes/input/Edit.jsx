import React from "react";

export default class Edit extends React.Component {
  static propsTypes = {
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || this.props.defaultValue || ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value || this.props.defaultValue || ""
      });
    }
  }

  render() {
    return (
      <input
        type="text"
        className="form__element"
        placeholder={this.props.placeholder}
        value={this.state.value}
        disabled={this.props.disableEdit}
        onChange={this.props.onChange}
      />
    );
  }
}
