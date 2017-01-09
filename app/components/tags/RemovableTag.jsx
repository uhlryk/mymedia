import React from "react";
import classNames from "classnames";
import Tag from "./Tag.jsx";

class RemovableTag extends React.Component {

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    return (
      <Tag className={classNames("tag--removable", {[this.props.className]: this.props.className})} onClick={this.props.onClick} name={this.props.name}>
        {this.props.children}
        <i className="tag__remove-icon" aria-hidden="true" />
      </Tag>
    );
  }
}
export default RemovableTag;
