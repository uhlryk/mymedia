import React from "react";
import classNames from "classnames";
import Tag from "./Tag.jsx";

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
      <div className="changeable-tag-wrapper">
        <div
          className={classNames("changeable-tag-wrapper__change-button", {
            "changeable-tag-wrapper__change-button--positive": this.props.isPositive,
            "changeable-tag-wrapper__change-button--negative": !this.props.isPositive
          })}
          onClick={this.onChange}
        ></div>
        {this.props.children}
      </div>
    );
  }
}
export default ChangeableTagWrapper;
