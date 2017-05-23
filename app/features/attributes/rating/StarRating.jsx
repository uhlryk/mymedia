import React from "react";
import classNames from "classnames";

class StarRating extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func,
    totalStars: React.PropTypes.number.isRequired,
    value: React.PropTypes.number,
    editing: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      hoverValue: 0
    }
    this.onMouseOverHandler = this.onMouseOverHandler.bind(this);
    this.onMouseOutHandler = this.onMouseOutHandler.bind(this);
  }

  onMouseOverHandler(value) {
    this.setState((prevState, props) => ({
      hoverValue: value
    }));
  }

  onMouseOutHandler() {
    this.setState((prevState, props) => ({
      hoverValue: 0
    }));
  }

  render() {
    let stars = [];
    let onClick = () => {
    };
    let onMouseOver = () => {
    };

    for (let i = 0; i < this.props.totalStars; i++) {
      if (this.props.editing) {
        onClick = () => {
          if (this.props.onChange) {
            this.props.onChange(i + 1);
          }
        };
        onMouseOver = () => this.onMouseOverHandler(i + 1);
      }
      let starValue = (!this.state.hoverValue && i < this.props.value) || i < this.state.hoverValue;
      let className = classNames("star-rating__star", {
        "star-rating__star--empty": !starValue,
        "star-rating__star--full": starValue
      });
      stars.push(
        <i
          key={i}
          onMouseOver={onMouseOver}
          onClick={onClick}
          className={className}
        />
      )
    }
    return (
      <div className="star-rating" onMouseOut={this.onMouseOutHandler}>
        {stars}
      </div>
    );
  }

}

export default StarRating;
