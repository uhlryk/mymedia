import React from "react";
import { connect } from "react-redux";
import Edit from "../attributes/Edit.jsx";
import Create from "../attributes/Create.jsx";
import * as formType from "../../constants/formType";
import AttributesExtensionManager from "../../features/attributes/AttributesExtensionManager";
@connect(state => ({
  attributes: state.attributes
}))
class Form extends React.Component {

  static propsTypes = {
    submit: React.PropTypes.func.isRequired,
    data: React.PropTypes.object,
    mode: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      details: props.data,
      validation: {}
    };

    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onAttributeChange(attributeId, value) {
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { [attributeId]: value})
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.submit(this.state.details);
  }

  validation() {
    let newValidation = {};
    let isValid = true;

    Object.keys(this.props.attributes).map(attributeId => {
      let attribute = this.props.attributes[attributeId];
      const validationResult = AttributesExtensionManager.validate(attribute, this.state.details[attributeId]);
      if(validationResult !== true) {
        isValid = false;
        newValidation[attributeId] = "Field is required";
      }
    });

    if(isValid === false) {
      this.setState((prevState, props) => ({
        validation: newValidation
      }));
    }
    return isValid;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {Object.keys(this.props.attributes).map(attributeId => {
          let attribute = this.props.attributes[attributeId];
          switch(this.props.mode) {
            case formType.CREATE:
              return (
                <Create
                  key={attributeId}
                  onChange={evt => this.onAttributeChange(attributeId, evt.target.value)}
                  value={this.state.details[attributeId]}
                  attribute={attribute}
                  validation={this.state.validation[attributeId]}
                />
              )
            case formType.EDIT:
              return (
                <Edit
                  key={attributeId}
                  onChange={evt => this.onAttributeChange(attributeId, evt.target.value)}
                  value={this.state.details[attributeId]}
                  attribute={attribute}
                  validation={this.state.validation[attributeId]}
                />
              )
          }
        })}
        <button type="submit" className="form__button">Submit</button>
      </form>
    );
  }
}

export default Form;
