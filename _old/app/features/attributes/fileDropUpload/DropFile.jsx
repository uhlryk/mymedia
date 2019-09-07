import React from "react";
import classNames from "classnames";

export default class DropFile extends React.Component {
  static propsTypes = {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    disableEdit: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragOver(event) {
    event.preventDefault();
    this.setState((prevState, props) => ({
      dragOver: true
    }));
  }

  handleDragLeave() {
    this.setState((prevState, props) => ({
      dragOver: false
    }));
  }

  handleDrop(event) {
    event.preventDefault();

    console.log(event.dataTransfer.files);
    const files = event.dataTransfer.files;
    if(files) {
      this.props.onChange(files);
    }

  }

  render() {
    const className = classNames("drop-file", this.props.className, {
      "drop-file--drag-over": this.state.dragOver
    });
    return (
      <div className={className} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
        <div className="drop-file__border">
          <div>{this.props.label}</div>
        </div>

      </div>
    );
  }
}