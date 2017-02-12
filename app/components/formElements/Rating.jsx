import React from "react";
import StarRating from "../StarRating.jsx";

const defaultState = {
  details: {
    starNumber: 0,
    defaultValue: 0
  }
};

export class Settings extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.sendChange = this.sendChange.bind(this);
    this.handleStarNumberChange = this.handleStarNumberChange.bind(this);
    this.handleDefaultValueChange = this.handleDefaultValueChange.bind(this);
  }

  handleStarNumberChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { starNumber: evt.target.value})
    }, this.sendChange);
  }

  handleDefaultValueChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { defaultValue: evt.target.value})
    }, this.sendChange);
  }

  sendChange() {
    if(this.props.onChange) {
      this.props.onChange(this.state.details);
    }
  }

  render() {
    return (
      <fieldset className="form__subform">
        <legend>Input settings</legend>
        <div className="form__group">
          <label>Number of stars</label>
          <input type="number" className="form__element" placeholder="Enter star number" value={this.state.details.starNumber} onChange={this.handleStarNumberChange} />
        </div>
        <div className="form__group">
          <label>Default value</label>
          <input type="number" className="form__element" placeholder="Enter default value" value={this.state.details.defaultValue} onChange={this.handleDefaultValueChange} />
        </div>
      </fieldset>
    );
  }
}

export class FormElement extends React.Component {
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
        editing={true}
        value={value}
        onChange={this.props.onChange}
      />
    );
  }
}

export class View extends React.Component {
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
