import React from "react";

const defaultState = {
  details: {
    placeholder: "",
    defaultValue: ""
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
    this.handlePlaceholderChange = this.handlePlaceholderChange.bind(this);
    this.handleDefaultValueChange = this.handleDefaultValueChange.bind(this);
  }

  handlePlaceholderChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { placeholder: evt.target.value})
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

export class FormElement extends React.Component {
  static propsTypes = {
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string
  };
  render() {
    let value = this.props.value || this.props.defaultValue || "";
    return (
      <input
        type="text"
        className="form__element"
        placeholder={this.props.placeholder}
        value={value}
        onChange={this.props.onChange}
      />
    );
  }
}

export class View extends React.Component {
  static propsTypes = {
    value: React.PropTypes.string.isRequired
  };
  render() {
    return (
      <div>{this.props.value}</div>
    );
  }
}
