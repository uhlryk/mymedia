import React from "react";
import path from "path";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
  fileList: state.fileList,
  project: state.project
}))
class Viewer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const videoPath = path.join(this.props.project.path, this.props.fileList[this.props.hashPath].path);
    return <a className="list__button" target="_blank" href={videoPath}><i className="fa fa-eye" aria-hidden="true"></i></a>;
  }
}

export default Viewer;
