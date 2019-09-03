import React from "react";
import path from "path";
import { connect } from "react-redux";

class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };


  constructor(props) {
    super(props);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick(filePath) {
    const projectPath = this.props.project.path;
    this.props.extension.requestMainProcess("open-resource", path.join(projectPath, filePath));
  }

  render() {
    return (
    <table className="table table-striped table-condensed table-hover">
      <tbody>
      {(this.props.value || []).map(fileData => (
        <tr key={fileData.id}>
          <td>{fileData.name}</td>
          <td><button onClick={() => this.onOpenClick(fileData.path)} className="button">Open</button></td>
        </tr>
      ))}
      </tbody>
    </table>
    );
  }
}

export default connect(state => ({
  project: state.project
}))(View);
export {
  View
}
