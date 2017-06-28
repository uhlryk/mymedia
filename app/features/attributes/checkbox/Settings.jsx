import React from "react";

const defaultState = {
  details: {
    defaultValue: false,
    editLabel: "",
    viewLabel: ""
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
    this.handleDefaultValueChange = this.handleDefaultValueChange.bind(this);
    this.handleEditLabelChange = this.handleEditLabelChange.bind(this);
    this.handleViewLabelChange = this.handleViewLabelChange.bind(this);
  }

  handleEditLabelChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { editLabel: value})
    }), this.onChange);
  }

  handleViewLabelChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { viewLabel: value})
    }), this.onChange);
  }

  handleDefaultValueChange(evt) {
    const value = evt.target.checked;
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
        <legend>Checkbox settings</legend>
        <div className="form__group">
          <label>View Label</label>
          <input type="text" className="form__element" placeholder="Enter view label" value={this.state.details.viewLabel} onChange={this.handleViewLabelChange} />
        </div>
        <div className="form__group">
          <label>Edit Label</label>
          <input type="text" className="form__element" placeholder="Enter edit label" value={this.state.details.editLabel} onChange={this.handleEditLabelChange} />
        </div>
        <div className="form__group">
          <label>Default value</label><br/>
          <label className="form-element__checkbox-label">
            <input
              type="checkbox"
              checked={this.state.details.defaultValue}
              onChange={this.handleDefaultValueChange}
            />&nbsp;
            Choice default value
          </label>
        </div>
      </fieldset>
    );
  }
}
