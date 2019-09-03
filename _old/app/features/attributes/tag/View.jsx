import React from "react";
import Tag from "./Tag.jsx";
export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };
  render() {
    return (
      <div className="file-list__tags">
        { this.props.value
          .map(tagName => <Tag tooltip="file-list" key={tagName} className="tag--inline" name={tagName} />)
        }
      </div>
    );
  }
}
