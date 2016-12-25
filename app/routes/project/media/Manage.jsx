import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagSelect from "../../../components/tags/TagSelect.jsx";
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
    Object.keys(this.state.details.tags).forEach(tagKey => {
      if(!this.props.tagList[tagKey]) {
        delete this.state.details.tags[tagKey];
      }
    });
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
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

  handleDescriptionChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { description: evt.target.value})
    });
  }

  handleAddTag(tagHashPath) {
    if(tagHashPath > 0) {
      this.setState({
        details: Object.assign({}, this.state.details, {
          tags: Object.assign({}, this.state.details.tags, {[tagHashPath]: true})
        })
      });
    }
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
      <div className="popup edit-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" value={this.state.details.name} onChange={this.handleNameChange} placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" rows="3" value={this.state.details.description} onChange={this.handleDescriptionChange} />
          </div>
          <div className="form-group">
            { Object.keys(this.state.details.tags)
              .map(tagKey => <div key={tagKey}><span className="badge">{this.props.tagList[tagKey].name}</span></div>)
              }
          </div>
          <div className="form-group">
            <label>Add Label</label>
            <TagSelect onChange={this.handleAddTag} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
          <button type="button" className="btn btn-default" onClick={this.onCloseClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Manage;