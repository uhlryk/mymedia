import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import Settings from "../../../components/attributes/Settings.jsx";
import { addNewAttribute } from "../../../actions/attributes";

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
class Manage extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleExtensionChange = this.handleExtensionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media"));
  }

  handleDisplayNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { displayName: evt.target.value})
    });
  }

  handleSettingsChange(settings) {
    this.setState({
      details: Object.assign({}, this.state.details, settings)
    });
  }

  handleExtensionChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, defaultState.details, { extensionName: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(addNewAttribute(this.state.details.extensionName, this.state.details));
    this.setState(defaultState);
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
      this.setState({
        validation: newValidation
      });
    }
    return isValid;
  }

  render() {
    const fields = Object.keys(this.props.attributes).map(id => {
      let attribute = this.props.attributes[id];
      return <div key={attribute.id}>{attribute.displayName}</div>
    });

    let attributeDisplayNameInput = (
      <div className="form__group">
        <label>Display name</label>
        <input type="text" className="form__element" value={this.state.details.displayName} onChange={this.handleDisplayNameChange} placeholder="Enter name" />
        <ValidationElementError error={this.state.validation.displayName} />
      </div>
    );
    return (
      <div className="popup form">
        <div className="popup__header">
          <div className="popup__title">Manage form elements</div>
          <div className="popup__back-button-wrapper">
            <button type="button" className="form__button" onClick={this.onCloseClick}>Back</button>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label>Attribute type</label>
            <select value={this.state.details.extensionName} onChange={this.handleExtensionChange} className="form__element">
              <option value="">select type</option>
              {
                this.context.extensions.attributes.getExtensions().filter(extension => !extension.isOnlyProjectExtensionUse())
                .map(extension => (
                  <option key={extension.getName()} value={extension.getName()}>{extension.getDisplayName()}</option>
                ))
              }
            </select>
            <ValidationElementError error={this.state.validation.extensionName} />
          </div>
          {this.state.details.extensionName ? attributeDisplayNameInput : null}
          <div className="form__group">
            { this.state.details.extensionName ? <Settings attributeExtensionName={this.state.details.extensionName} onChange={this.handleSettingsChange}/> : false }
          </div>
          <button type="submit" className="form__button">Create</button>
        </form>
        <div>
          {fields}
        </div>
      </div>
    );
  }
}

export default Manage;
