import React from "react";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };
  render() {
    return (
      <div>{this.props.value.name}</div>
    );
  }
}
