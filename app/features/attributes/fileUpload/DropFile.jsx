import React from "react";
import classNames from "classnames";

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
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
  }

  handleDragOver() {
    this.setState((prevState, props) => ({
      dragOver: true
    }));
  }

  handleDragLeave() {
    this.setState((prevState, props) => ({
      dragOver: false
    }));
  }

  render() {
    const className = classNames("drop-file", this.props.className, {
      "drop-file--drag-over": this.state.dragOver
    });
    return (
      <div className={className} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave}>
        <div className="drop-file__border">{this.props.label}</div>
      </div>
    );
  }
}
