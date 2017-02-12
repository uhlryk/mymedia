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
  }

  onMouseOverHandler(value) {
    this.setState({
      hoverValue: value
    });
  }

  render() {
    let stars = [];
    let onClick = () => {};
    let onMouseOver = () => {};

    for(let i = 0; i < this.props.totalStars; i++) {
      if(this.props.editing) {
        onClick = (evt) => {
          if(this.props.onChange) {
            evt.target.value = i + 1;
            this.props.onChange(evt)
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
      <div className="star-rating" onMouseOut={() => this.setState({ hoverValue : 0 })}>
        {stars}
      </div>
    );
  }

}

export default StarRating;
