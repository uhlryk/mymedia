import React from "react";
import StarRating from "./StarRating.jsx";

export default class Edit extends React.Component {
  static propsTypes = {
    starNumber: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string
  };

  render() {
    let value = this.props.value || this.props.defaultValue || 0;
    return (
      <StarRating
        totalStars={this.props.starNumber}
        editing={!this.props.disableEdit}
        value={value}
        onChange={this.props.onChange}
      />
    );
  }
}