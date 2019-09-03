import React from "react";
import classNames from "classnames";
import Tag from "./Tag.jsx";

class RemovableTag extends React.Component {

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    color: React.PropTypes.string,
    tooltip: React.PropTypes.string
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
      <Tag className={classNames("tag--removable", {[this.props.className]: this.props.className})} onClick={this.props.onClick} name={this.props.name} color={this.props.color} tooltip={this.props.tooltip} >
        {this.props.children}
        <i className="tag__remove-icon" aria-hidden="true" />
      </Tag>
    );
  }
}
export default RemovableTag;
