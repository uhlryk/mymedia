import React from "react";

const defaultState = {
  details: {
    label: "",
    uploadPath: ""
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
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleUploadPath = this.handleUploadPath.bind(this);
  }

  handleLabelChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { label: value})
    }), this.onChange);
  }

  handleUploadPath(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { uploadPath: value})
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
        <legend>Upload file settings</legend>
        <div className="form__group">
          <label>Label</label>
          <input type="text" className="form__element" placeholder="Enter label" value={this.state.details.label} onChange={this.handleLabelChange} />
        </div>
        <div className="form__group">
          <label>Upload path</label>
          <input type="text" className="form__element" placeholder="Enter upload path" value={this.state.details.uploadPath} onChange={this.handleUploadPath} />
        </div>
      </fieldset>
    );
  }
}
