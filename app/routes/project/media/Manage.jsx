import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import uuid from "uuid-v4";
//import TagSelect from "../../../components/tags/TagSelect.jsx";
import TagInput from "../../../components/tags/TagInput.jsx";
import RemovableTag from "../../../components/tags/RemovableTag.jsx";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import { saveMedia } from "../../../actions/index";
import { addTag } from "../../../actions/tagList";
@connect(state => ({
  fileList: state.fileList,
  tagList: state.tagList
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: Object.assign({}, this.props.fileList[this.props.params.hashPath]),
      newTags: {},
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
    var tag = Object.keys(this.props.tagList).map(id => this.props.tagList[id]).find(tag => tag.name === name);
    const newState = {};
    if(!tag) {
      tag = {
        name,
        uuid: uuid()
      };
      const newTags = Object.assign({}, this.state.newTags, { [tag.uuid]: tag });
      newState.newTags = newTags;
    }
    newState.details = Object.assign({}, this.state.details, {
      tags: Object.assign({}, this.state.details.tags, {[tag.uuid]: true})
    });
    this.setState(newState);

  }

  handleRemoveTag(tagHash) {
    let tags = Object.assign({}, this.state.details.tags);
    delete tags[tagHash];
    this.setState({
      details: Object.assign({}, this.state.details, {
        tags
      })
    });
  }

  handleRemoveNewTag(id) {
    let newTags = Object.assign({}, this.state.newTags);
    delete newTags[id];
    let tags = Object.assign({}, this.state.details.tags);
    delete tags[id];
    this.setState({
      newTags,
      details: Object.assign({}, this.state.details, {
        tags
      })
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    Object.keys(this.state.newTags).forEach(uuid => {
      const tag = this.state.newTags[uuid];
      this.props.dispatch(addTag(tag.name, tag.uuid));
    });
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
    const tags = [];
    Object.keys(this.state.details.tags)
      .forEach(tagKey => {
        if(this.props.tagList[tagKey]) {
          tags.push(
            <RemovableTag
              key={tagKey} className="tag--inline"
              onClick={() => this.handleRemoveTag(this.props.tagList[tagKey].uuid)}
              name={this.props.tagList[tagKey].name}/>
          );
        } else if(this.state.newTags[tagKey]) {
          tags.push(
            <RemovableTag
              key={tagKey} className="tag--inline"
              onClick={() => this.handleRemoveNewTag(this.state.newTags[tagKey].uuid)}
              name={this.state.newTags[tagKey].name}/>
          );
        }
      })
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
            <TagInput onAddTag={this.handleAddTag} tagList={this.props.tagList} />
          </div>
          <button type="submit" className="form__button">Submit</button>
          <button type="button" className="form__button" onClick={this.onCloseClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Manage;
