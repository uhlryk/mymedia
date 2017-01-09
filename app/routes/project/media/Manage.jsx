import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagSelect from "../../../components/tags/TagSelect.jsx";
import RemovableTag from "../../../components/tags/RemovableTag.jsx";
import ValidationElementError from "../../../components/ValidationElementError.jsx";
import { saveMedia } from "../../../actions/index";

@connect(state => ({
  fileList: state.fileList,
  tagList: state.tagList
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.fileList[this.props.params.hashPath].tags)
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

  handleAddTag(tagHash) {
    this.setState({
      details: Object.assign({}, this.state.details, {
        tags: Object.assign({}, this.state.details.tags, {[tagHash]: true})
      })
    });
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
            { Object.keys(this.state.details.tags)
              .map(tagKey => <RemovableTag key={tagKey} className="tag--inline" onClick={() => this.handleRemoveTag(this.props.tagList[tagKey].uuid)} name={this.props.tagList[tagKey].name}/>)
              }
          </div>
          <div className="form__group">
            <label>Add Label</label>
            <TagSelect onChange={this.handleAddTag} tagList={this.props.tagList} />
          </div>
          <button type="submit" className="form__button">Submit</button>
          <button type="button" className="form__button" onClick={this.onCloseClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Manage;
