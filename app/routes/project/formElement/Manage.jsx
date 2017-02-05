import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import {Settings} from "../../../components/FormElement.jsx";
import { addNewElement } from "../../../actions/formElement";


@connect(state => ({
  formElement: state.formElement
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {
        name: "",
        type: ""
      },
      validation: {}
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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

  handleTypeChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { type: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(addNewElement(this.state.details.name, this.state.details.type));
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
    const fields = Object.keys(this.props.formElement).map(id => {
      let element = this.props.formElement[id];
      return <div key={element.id}>{element.name}</div>
    });
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
            <label>Element name</label>
            <input type="text" className="form__element" value={this.state.details.name} onChange={this.handleNameChange} placeholder="Enter name" />
            <ValidationElementError error={this.state.validation.name} />
          </div>
          <div className="form__group">
            <label>Element type</label>
            <select value={this.state.details.type} onChange={this.handleTypeChange}>
              <option value="">select type</option>
              <option value="input">input</option>
              <option value="rating">rating</option>
            </select>
            <ValidationElementError error={this.state.validation.type} />
          </div>
          <div className="form__group">
            <Settings type={this.state.details.type} />
          </div>
          <button type="submit" className="form__button">Submit</button>
        </form>
        <div>
          {fields}
        </div>
      </div>
    );
  }
}

export default Manage;
