import React from "react";
class ValidationElementError extends React.Component {
  static propsTypes = {
    error: React.PropTypes.string
  };

  render() {
    if(!this.props.error) {
      return false;
    }
    return <div className="form__element-helper form__element-helper--error">{this.props.error}</div>;
  }
}
export default ValidationElementError;
