import React from "react";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };
  render() {
    return (
    <table className="table table-striped table-condensed table-hover">
      <tbody>
      {(this.props.value || []).map(fileData => (
        <tr key={fileData.id}>
          <td>{fileData.name}</td>
          <td><button className="button">Open</button></td>
        </tr>
      ))}
      </tbody>
    </table>
    );
  }
}
