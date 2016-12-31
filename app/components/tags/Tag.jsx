import React from "react";
import classNames from "classnames";

class Tag extends React.Component {

  static propsTypes = {
    name: React.PropTypes.string,
    inline: React.PropTypes.bool,
    remove: React.PropTypes.func,
    revert: React.PropTypes.func
  };

  render() {
    let removeButton = false;
    if(this.props.remove) {
      removeButton = <div className="tag__button"><i className="fa fa-times" aria-hidden="true"></i></div>;
    }
    let revertButton = false;
    if(this.props.revert) {
      revertButton = <div className="tag__button"><i className="fa fa-exchange" aria-hidden="true"></i></div>;
    }
    return (
      <div className={classNames("tag", {"tag--inline": this.props.inline, "tag--one-button": this.props.remove || this.props.revert, "tag--two-button": this.props.remove && this.props.revert})}>
        <div className="tag__tag">{this.props.name}</div>
        {removeButton}
        {revertButton}
      </div>
    );
  }
}
export default Tag;
