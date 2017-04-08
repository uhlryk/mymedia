import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Edit from "../../../components/attributes/Edit.jsx";
import TagInput from "../../../features/attributes/tag/TagInput.jsx";
import RemovableTag from "../../../features/attributes/tag/RemovableTag.jsx";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import { updateFile } from "../../../actions/fileList";
import ReactTooltip from "react-tooltip";
import AttributesExtensionManager from "../../../features/attributes/AttributesExtensionManager";
@connect(state => ({
  fileList: state.fileList,
  attributes: state.attributes
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: Object.assign({}, props.fileList[props.params.hashPath]),
      hashPath: props.params.hashPath,
      validation: {}
    };

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onAttributeChange = this.onAttributeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media"));
  }

  onAttributeChange(attributeId, value) {
    this.setState({
      details: Object.assign({}, this.state.details, { [attributeId]: value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(updateFile(this.state.hashPath, this.state.details));
    this.props.dispatch(push("project/media"));
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
      this.setState({
        validation: newValidation
      });
    }
    return isValid;
  }

  render() {
    return (
      <div className="popup form">
        <div className="popup__header">
          <div className="popup__title">Manage file</div>
          <div className="popup__back-button-wrapper">
            <button type="button" className="form__button" onClick={this.onCloseClick}>Back</button>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          {Object.keys(this.props.attributes).map(attributeId => {
            let attribute = this.props.attributes[attributeId];
            return (
              <Edit
                key={attributeId}
                onChange={evt => this.onAttributeChange(attributeId, evt.target.value)}
                value={this.state.details[attributeId]}
                attribute={attribute}
                validation={this.state.validation[attributeId]}
              />
            )
          })}
          <button type="submit" className="form__button">Submit</button>
        </form>
        <ReactTooltip place="top" type="info" effect="float" id="manage-component" class="tooltip"/>
      </div>
    );
  }
}

export default Manage;
