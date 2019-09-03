import React from "react";
import path from "path";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired,
    projectPath: React.PropTypes.string.isRequired
  };
  render() {
    return (
      <div className="image-attribute">
        <img className="image-attribute__thumbnail" src={path.join(this.props.projectPath, this.props.value[0].path)}/>
      </div>
    );
  }
}
