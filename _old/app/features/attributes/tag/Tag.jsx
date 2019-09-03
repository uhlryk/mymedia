import React from "react";
import classNames from "classnames";

class Tag extends React.Component {

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    color: React.PropTypes.string,
    onClick: React.PropTypes.func,
    tooltip: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if(this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const color = this.props.color || "tag__tag--neutral-color";
    return (
      <div data-tip={this.props.name} data-for={this.props.tooltip} className={classNames("tag", {[this.props.className]: this.props.className, "tag--clickable": this.props.onClick})} onClick={this.onClick}>
        <div className={classNames("tag__tag", color)}>
          {this.props.name}
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Tag;
