import React from "react";
import FileSize from "./FileSize.jsx";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };
  render() {
    return (
      <div><FileSize value={this.props.value} /></div>
    );
  }
}
