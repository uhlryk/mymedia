import React from "react";
import classNames from "classnames";
import ActionMenu from "./ActionMenu.jsx";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { ipcRenderer } from "electron";
import path from "path";

@connect(state => ({
  fileList: state.fileList,
  project: state.project
}))
class FileActionMenu extends React.Component {

  static propsTypes = {
    hashPath: React.PropTypes.string
  };

  render() {
    const menuElements = [{
      label: "run",
      onClick: () => {
        const videoPath = path.join(this.props.project.path, this.props.fileList[this.props.hashPath].path);
        ipcRenderer.send("open", videoPath);;
      }
    }, {
      label: "edit",
      onClick: () => this.props.dispatch(push("project/media/edit/" + this.props.hashPath))
    }, {
      label: "tags",
      onClick: () => this.props.dispatch(push("project/media/tag/manage/" + this.props.hashPath))
    }];
    return <ActionMenu elements={menuElements} />;
  }
}
export default FileActionMenu;
