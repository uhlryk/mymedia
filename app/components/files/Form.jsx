import React from "react";
import { updateResource, addResource } from "../../actions/fileList";
import { connect } from "react-redux";
import Edit from "../attributes/Edit.jsx";
import Create from "../attributes/Create.jsx";
import AttributesExtensionManager from "../../features/attributes/AttributesExtensionManager";
@connect(state => ({
  attributes: state.attributes
}))
class Form extends React.Component {

  static EDIT = "form_mode.edit";
  static CREATE = "form_mode.create";

  static propsTypes = {
    submit: React.PropTypes.func.isRequired,
    data: React.PropTypes.object,
    mode: React.PropTypes.string,
    closeModal: React.PropTypes.function,
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
    switch(this.props.mode) {
      case Form.EDIT:
        this.props.dispatch(updateResource(this.props.data.hashPath, this.state.details));
        break;
      case Form.CREATE:
        this.props.dispatch(addResource(this.state.details));
        break;
    }
    this.props.closeModal();
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
            case Form.CREATE:
              return (
                <Create
                  key={attributeId}
                  onChange={value => this.onAttributeChange(attributeId, value)}
                  value={this.state.details[attributeId]}
                  attribute={attribute}
                  validation={this.state.validation[attributeId]}
                />
              )
            case Form.EDIT:
              return (
                <Edit
                  key={attributeId}
                  onChange={value => this.onAttributeChange(attributeId, value)}
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
