import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ValidationElementError from "../ValidationElementError.jsx";
import Settings from "./Settings.jsx";
import { addNewAttribute } from "../../actions/attributes";

const defaultState = {
  details: {
    displayName: "",
    extensionName: ""
  },
  validation: {}
};

@connect(state => ({
  attributes: state.attributes
}))
class ManageForm extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    closeModal: React.PropTypes.function
  }

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleExtensionChange = this.handleExtensionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDisplayNameChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { displayName: value})
    }));
  }

  handleSettingsChange(settings) {
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, settings)
    }));
  }

  handleExtensionChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, defaultState.details, { extensionName: value})
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(addNewAttribute(this.state.details.extensionName, this.state.details));
    this.props.closeModal();
  }

  validation() {
    let newValidation = {};
    let isValid = true;
    if(!this.state.details.displayName || this.state.details.displayName === "") {
      isValid = false;
      newValidation.displayName = 'Field is required';
    }
    if(!this.state.details.extensionName || this.state.details.extensionName === "") {
      isValid = false;
      newValidation.extensionName = 'Field is required';
    }
    if(isValid === false) {
      this.setState((prevState, props) => ({
        validation: newValidation
      }));
    }
    return isValid;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="modal__body">
          <div className="form__group">
            <label>Attribute type</label>
            <select value={this.state.details.extensionName} onChange={this.handleExtensionChange} className="form__element">
              <option value="">select type</option>
              {
                this.context.extensions.attributes.getExtensions().filter(extension => !extension.getConfig().settings.createDisabled)
                .map(extension => (
                  <option key={extension.getName()} value={extension.getName()}>{extension.getConfig().settings.displayName}</option>
                ))
              }
            </select>
            <ValidationElementError error={this.state.validation.extensionName} />
          </div>
          {this.state.details.extensionName ? (
            <div>
              <div className="form__group">
                <label>Display name</label>
                <input type="text" className="form__element" value={this.state.details.displayName} onChange={this.handleDisplayNameChange} placeholder="Enter name" />
                <ValidationElementError error={this.state.validation.displayName} />
              </div>
              <div className="form__group">
                <Settings attributeExtensionName={this.state.details.extensionName} onChange={this.handleSettingsChange}/>
              </div>
            </div>
          ) : null}
        </div>
        <div className="modal__footer">
          <button type="submit" className="modal__button-action">Create</button>
        </div>
      </form>
    );
  }
}

export default ManageForm;
