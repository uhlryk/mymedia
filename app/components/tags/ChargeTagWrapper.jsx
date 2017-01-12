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
      <div className={classNames("changeable-tag-wrapper", {
            "changeable-tag-wrapper--positive": this.props.isPositive,
            "changeable-tag-wrapper--negative": !this.props.isPositive
          })}
      >
        <div
          className="changeable-tag-wrapper__change-button"
          onClick={this.onChange}
        ></div>
        {this.props.children}
      </div>
    );
  }
}
export default ChangeableTagWrapper;
