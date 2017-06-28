import React from "react";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired,
    viewLabel: React.PropTypes.string
  };
  render() {
    console.log("checkbox", this.props.value);
    const value = this.props.value ? <i className="fa fa-check-square-o" aria-hidden="true"></i> : <i className="fa fa-square-o" aria-hidden="true"></i>;
    return (
      <div>{value} {this.props.viewLabel}</div>
    );
  }
}
