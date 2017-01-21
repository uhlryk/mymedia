import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import uuid from "uuid-v4";
import TagInput from "../../../components/tags/TagInput.jsx";
import RemovableTag from "../../../components/tags/RemovableTag.jsx";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import { saveMedia } from "../../../actions/index";
import ReactTooltip from "react-tooltip";

@connect(state => ({
  fileList: state.fileList,
  tagList: state.tagList
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: Object.assign({}, this.props.fileList[this.props.params.hashPath]),
      hashPath: this.props.params.hashPath,
      validation: {}
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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

  handleDescriptionChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { description: evt.target.value})
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
    this.props.dispatch(saveMedia(this.state.hashPath, this.state.details));
    this.props.dispatch(push("project/media"));
  }

  validation() {
    let newValidation = {};
    let isValid = true;
    if(!this.state.details.name || this.state.details.name === "") {
      isValid = false;
      newValidation.name = 'Field is required';
    }

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
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label>Name</label>
            <input type="text" className="form__element" value={this.state.details.name} onChange={this.handleNameChange} placeholder="Enter name" />
            <ValidationElementError error={this.state.validation.name} />
          </div>
          <div className="form__group">
            <label>Description</label>
            <textarea className="form__element" rows="3" value={this.state.details.description} onChange={this.handleDescriptionChange} />
          </div>
          <div className="form__group">
            {tags}
          </div>
          <div className="form__group">
            <label>Add Label</label>
            <TagInput onAddTag={this.handleAddTag} tagList={suggestedTags} />
          </div>
          <button type="submit" className="form__button">Submit</button>
          <button type="button" className="form__button" onClick={this.onCloseClick}>Cancel</button>
        </form>
        <ReactTooltip place="top" type="info" effect="float" id="manage-component" class="tooltip"/>
      </div>
    );
  }
}

export default Manage;
