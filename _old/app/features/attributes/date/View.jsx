import React from "react";
import DateDisplay from "./DateDisplay.jsx";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };
  render() {
    return (
      <div><DateDisplay value={this.props.value} /></div>
    );
  }
}
