import React from "react";

export default class DropFile extends React.Component {
  static propsTypes = {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    disableEdit: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || this.props.defaultValue || ""
    }
  }

  render() {
    return (
      <div className="drop-file">{this.props.label}</div>
    );
  }
}
