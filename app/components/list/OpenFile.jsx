import React from "react";
import path from "path";
import { ipcRenderer } from "electron";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
  fileList: state.fileList,
  project: state.project
}))
class OpenFile extends React.Component {

  static propsTypes = {
    className: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const videoPath = path.join(this.props.project.path, this.props.fileList[this.props.hashPath].path);
    ipcRenderer.send("open", videoPath);;
  }

  render() {
    return <div className={this.props.className} target="_blank" onClick={this.onClick}>run</div>;
  }
}

export default OpenFile;
