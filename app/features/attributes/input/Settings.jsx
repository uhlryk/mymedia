import React from "react";

const defaultState = {
  details: {
    placeholder: "",
    defaultValue: ""
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
    this.handlePlaceholderChange = this.handlePlaceholderChange.bind(this);
    this.handleDefaultValueChange = this.handleDefaultValueChange.bind(this);
  }

  handlePlaceholderChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { placeholder: value})
    }), this.onChange);
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
        <legend>Input settings</legend>
        <div className="form__group">
          <label>Placeholder</label>
          <input type="text" className="form__element" placeholder="Enter placeholder" value={this.state.details.placeholder} onChange={this.handlePlaceholderChange} />
        </div>
        <div className="form__group">
          <label>Default value</label>
          <input type="text" className="form__element" placeholder="Enter default value" value={this.state.details.defaultValue} onChange={this.handleDefaultValueChange} />
        </div>
      </fieldset>
    );
  }
}
