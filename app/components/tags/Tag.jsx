import React from "react";
import classNames from "classnames";

class Tag extends React.Component {

  static propsTypes = {
    name: React.PropTypes.string,
    inline: React.PropTypes.bool
  };

  render() {

    return <div className={classNames("tag", {"tag--inline": this.props.inline})} >{this.props.name}</div>;
  }
}
export default Tag;
