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

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const videoPath = path.join(this.props.project.path, this.props.fileList[this.props.hashPath].path);
    ipcRenderer.send("open", videoPath);;
  }

  render() {
    return <a className="list__button" target="_blank" onClick={this.onClick}><i className="fa fa-eye" aria-hidden="true"></i></a>;
  }
}

export default OpenFile;
