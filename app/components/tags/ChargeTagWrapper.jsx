import React from "react";
import classNames from "classnames";
import Tag from "./Tag.jsx";

class ChargeTagWrapper extends React.Component {

  static propsTypes = {
    isPositive: React.PropTypes.bool.isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={classNames("changeable-tag-wrapper", {
        [this.props.className]: this.props.className,
        "changeable-tag-wrapper--positive": this.props.isPositive,
        "changeable-tag-wrapper--negative": !this.props.isPositive
          })}
      >
        {this.props.children}
      </div>
    );
  }
}
export default ChargeTagWrapper;
