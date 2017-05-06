import React from "react";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  renderFilterPath() {
    const pathFilter = this.props.value || [];
    return pathFilter.map(((pathElement, elementIndex, arr) => (
      <div key={elementIndex} className="breadcrumbs__element" >{pathElement}</div>
    )));
  }

  render() {
    return (
      <div className="breadcrumbs">
        <div className="breadcrumbs__element breadcrumbs__element--root"><i className="fa fa-home"></i></div>
        {this.renderFilterPath()}
      </div>
    );
  }
}
