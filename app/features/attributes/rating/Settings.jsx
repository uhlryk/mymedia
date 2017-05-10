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
    this.onChange = this.onChange.bind(this);
    this.handleStarNumberChange = this.handleStarNumberChange.bind(this);
    this.handleDefaultValueChange = this.handleDefaultValueChange.bind(this);
  }

  handleStarNumberChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { starNumber: value})
    }));
  }

  handleDefaultValueChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { defaultValue: value})
    }), this.onChange);
  }

  onChange() {
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
