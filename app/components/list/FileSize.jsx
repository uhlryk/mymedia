import React from "react";
import filesize from "filesize";

class FileSize extends React.Component {
  render() {
    return <span>{filesize(this.props.data)}</span>;
  }
}
export default FileSize;
