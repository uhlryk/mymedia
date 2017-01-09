import React from "react";
import classNames from "classnames";

class Tag extends React.Component {

  static propsTypes = {
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
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
    return (
      <div className={classNames("tag", {[this.props.className]: this.props.className})} onClick={this.onClick}>
        <div className="tag__tag">{this.props.children}</div>
      </div>
    );
  }
}
export default Tag;
