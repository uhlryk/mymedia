import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Edit from "../../../components/formElements/Edit.jsx";
import TagInput from "../../../components/tags/TagInput.jsx";
import RemovableTag from "../../../components/tags/RemovableTag.jsx";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import { updateFile } from "../../../actions/fileList";
import ReactTooltip from "react-tooltip";
import FormElementExtensionManager from "../../../features/extensions/formElements/FormElementsExtensionManager";
@connect(state => ({
  fileList: state.fileList,
  tagList: state.tagList,
  formElement: state.formElement
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
    this.handleNameChange = this.handleNameChange.bind(this);
    this.onFormElementChange = this.onFormElementChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media"));
  }

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value})
    });
  }

  onFormElementChange(elementId, value) {
    this.setState({
      details: Object.assign({}, this.state.details, { [elementId]: value})
    });
  }

  handleAddTag(name) {
    if(!name) {
      return;
    }
    this.setState({
      details: Object.assign({}, this.state.details, {
        tags: [...new Set([name].concat(this.state.details.tags))]
      })
    }, () => {
      ReactTooltip.rebuild();
    });

  }

  handleRemoveTag(name) {
    ReactTooltip.hide();
    this.setState({
      details: Object.assign({}, this.state.details, {
        tags: this.state.details.tags.filter(tagName => tagName !== name)
      })
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
    if(!this.state.details.name) {
      isValid = false;
      newValidation.name = "Field is required";
    }

    Object.keys(this.props.formElement).map(elementId => {
      let element = this.props.formElement[elementId];
      const validationResult = FormElementExtensionManager.validate(element, this.state.details[elementId]);
      if(validationResult !== true) {
        isValid = false;
        newValidation[elementId] = "Field is required";
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
    const tags = this.state.details.tags
      .map(name =>
          <RemovableTag
            tooltip="manage-component"
            key={name} className="tag--inline"
            onClick={() => this.handleRemoveTag(name)}
            name={name}/>
      );
    const suggestedTags = this.props.tagList.filter(tagName => this.state.details.tags.indexOf(tagName) === -1);
    return (
      <div className="popup form">
        <div className="popup__header">
          <div className="popup__title">Manage file</div>
          <div className="popup__back-button-wrapper">
            <button type="button" className="form__button" onClick={this.onCloseClick}>Back</button>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label>Name</label>
            <input
              type="text"
              className="form__element"
              value={this.state.details.name}
              onChange={this.handleNameChange}
              placeholder="Enter name"
            />
            <ValidationElementError error={this.state.validation.name} />
          </div>
          {Object.keys(this.props.formElement).map(elementId => {
            let element = this.props.formElement[elementId];
            return (
              <Edit
                key={elementId}
                onChange={evt => this.onFormElementChange(elementId, evt.target.value)}
                value={this.state.details[elementId]}
                name={element.name} type={element.type}
                settings={element.settings}
                validation={this.state.validation[elementId]}
              />
            )
          })}
          <div className="form__group">
            {tags}
          </div>
          <div className="form__group">
            <label>Add Label</label>
            <TagInput onAddTag={this.handleAddTag} tagList={suggestedTags} />
          </div>
          <button type="submit" className="form__button">Submit</button>
        </form>
        <ReactTooltip place="top" type="info" effect="float" id="manage-component" class="tooltip"/>
      </div>
    );
  }
}

export default Manage;
