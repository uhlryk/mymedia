import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { addTag } from "../../../../actions/tagList";
import TagSelect from "../../../../components/tags/TagSelect.jsx";
import Tag from "../../../../components/tags/Tag.jsx";
import ValidationElementError from "../../../../components/ValidationElementError.jsx";
@connect(state => ({
  tagList: state.tagList
}))
class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {
        name: ""
      },
      validation: {}
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleParentChange = this.handleParentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media/"));
  }

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value })
    });
  }

  handleParentChange(hashPath) {
    this.setState({
      details: Object.assign({}, this.state.details, { parent: hashPath })
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(addTag(this.state.details));
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
    let parent = false;
    if(this.state.details.parent) {
      parent = <Tag name={this.props.tagList[this.state.details.parent].name} />;
    }
    return (
      <div className="popup form">
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label>Name</label>
            <input type="text" className="form__element" value={this.state.details.name} onChange={this.handleNameChange} placeholder="Enter name" />
            <ValidationElementError error={this.state.validation.name} />
          </div>
          <div className="form__group">
            {parent}
            <label>Select parent</label>
            <TagSelect onChange={this.handleParentChange} />
          </div>
          <button type="submit" className="form__button">Submit</button>
          <button type="button" className="form__button" onClick={this.onCloseClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Form;
