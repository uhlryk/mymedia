import React from "react";
import path from "path";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired,
    projectPath: React.PropTypes.string.isRequired
  };
  render() {
    const images = this.props.value.map(image => (
      <div key={image.name} className="image-gallery-attribute__thumbnail-wrapper">
        <img className="image-gallery-attribute__thumbnail" src={path.join(this.props.projectPath, image.path)}/>
      </div>
    ));
    return (
      <div className="image-gallery-attribute">
        <div className="image-gallery-attribute__wrapper">
          {images}
        </div>
      </div>
    );
  }
}
