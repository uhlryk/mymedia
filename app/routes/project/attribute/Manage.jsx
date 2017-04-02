import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import Settings from "../../../components/attributes/Settings.jsx";
import { addNewElement } from "../../../actions/attributes";

const defaultState = {
  details: {
    name: "",
    type: "",
    settings: {}
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
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media"));
  }

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value})
    });
  }

  handleSettingsChange(settings) {
    this.setState({
      details: Object.assign({}, this.state.details, { settings: Object.assign({}, settings)})
    });
  }

  handleTypeChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, defaultState.details,{type: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(addNewElement(this.state.details.name, this.state.details.type, this.state.details.settings));
    this.setState(defaultState);
  }

  validation() {
    let newValidation = {};
    let isValid = true;
    if(!this.state.details.name || this.state.details.name === "") {
      isValid = false;
      newValidation.name = 'Field is required';
    }
    if(!this.state.details.type || this.state.details.type === "") {
      isValid = false;
      newValidation.type = 'Field is required';
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
      let element = this.props.attributes[id];
      return <div key={element.id}>{element.name}</div>
    });

    let nameElement = (
      <div className="form__group">
        <label>Element name</label>
        <input type="text" className="form__element" value={this.state.details.name} onChange={this.handleNameChange} placeholder="Enter name" />
        <ValidationElementError error={this.state.validation.name} />
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
            <label>Element type</label>
            <select value={this.state.details.type} onChange={this.handleTypeChange} className="form__element">
              <option value="">select type</option>
              {
                this.context.extensions.getFormElements().getExtensions().filter(extension => !extension.isOnlyProjectExtensionUse())
                .map(extension => (
                  <option key={extension.getName()} value={extension.getName()}>{extension.getDisplayName()}</option>
                ))
              }
            </select>
            <ValidationElementError error={this.state.validation.type} />
          </div>
          {this.state.details.type ? nameElement : null}
          <div className="form__group">
            { this.state.details.type ? <Settings type={this.state.details.type} onChange={this.handleSettingsChange}/> : false }
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
