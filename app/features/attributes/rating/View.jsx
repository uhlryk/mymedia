import React from "react";
import StarRating from "./StarRating.jsx";

export default class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired,
    starNumber: React.PropTypes.number
  };
  render() {
    return (
      <StarRating
        totalStars={this.props.starNumber}
        editing={false}
        value={this.props.value}
      />
    );
  }
}
