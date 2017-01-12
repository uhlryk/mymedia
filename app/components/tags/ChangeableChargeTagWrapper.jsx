import React from "react";
import classNames from "classnames";
import ChargeTagWrapper from "./ChargeTagWrapper.jsx";

class ChangeableTagWrapper extends React.Component {

  static propsTypes = {
    isPositive: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.onChange();
  }

  render() {
    return (
      <ChargeTagWrapper isPositive={this.props.isPositive} className={this.props.className}>
        <div
          className="changeable-tag-wrapper__change-button"
          onClick={this.onChange}
        ></div>
        {this.props.children}
      </ChargeTagWrapper>
    );
  }
}
export default ChangeableTagWrapper;
