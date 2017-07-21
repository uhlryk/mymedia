import React from "react";
import { connect } from "react-redux";
import { openFile } from "./../../../actions/openFile";

@connect(state => ({}))
export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };


  constructor(props) {
    super(props);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick(filePath) {
    this.props.dispatch(openFile(filePath));
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
