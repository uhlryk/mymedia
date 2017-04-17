import React from "react";

const defaultState = {
  details: {
    starNumber: 0,
    defaultValue: 0
  }
};

export default class Settings extends React.Component {
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
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { starNumber: evt.target.value})
    }));
  }

  handleDefaultValueChange(evt) {
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { defaultValue: evt.target.value})
    }));
  }

  componentDidUpdate() {
    if(this.props.onChange) {
      this.props.onChange(this.state.details);
    }
  }

  render() {
    return (
      <fieldset className="form__subform">
        <legend>Rating settings</legend>
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
