import React from "react";
import { updateResource, addResource } from "../../actions/resources";
import { connect } from "react-redux";
import Edit from "../attributes/Edit.jsx";
import Create from "../attributes/Create.jsx";
import AttributesExtensionManager from "../../features/attributes/AttributesExtensionManager";

class ManageForm extends React.Component {

  static EDIT = "form_mode.edit";
  static CREATE = "form_mode.create";

  static propsTypes = {
    data: React.PropTypes.object,
    mode: React.PropTypes.string,
    closeModal: React.PropTypes.function
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
      case ManageForm.EDIT:
        this.props.dispatch(updateResource(this.props.data.id, this.state.details));
        break;
      case ManageForm.CREATE:
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
      <form onSubmit={this.handleSubmit} className="form">
        <div className="modal__body">
          {Object.keys(this.props.attributes).map(attributeId => {
            let attribute = this.props.attributes[attributeId];
            switch(this.props.mode) {
              case ManageForm.CREATE:
                return (
                  <Create
                    key={attributeId}
                    onChange={value => this.onAttributeChange(attributeId, value)}
                    value={this.state.details[attributeId]}
                    attribute={attribute}
                    validation={this.state.validation[attributeId]}
                  />
                )
              case ManageForm.EDIT:
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
        </div>
        <div className="modal__footer">
          <button type="submit" className="modal__button-action">Submit</button>
        </div>
      </form>
    );
  }
}

export default connect(state => ({
  attributes: state.attributes
}))(ManageForm);
export {
  ManageForm
}

