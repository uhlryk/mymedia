import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { saveMedia } from "../../../actions/index";

@connect(state => ({
  fileList: state.fileList
}))
class EditFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: this.props.fileList[this.props.params.hashPath],
      hashPath: this.props.params.hashPath,
      validation: {}
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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
          <RB.Input
            type='text'
            value={this.state.details.name}
            placeholder='Enter name'
            label='Name'
            ref='nameInput'
            help={this.state.validation.name}
            groupClassName='group-class'
            labelClassName='label-class'
            onChange={this.handleNameChange} />

          <RB.ButtonInput type='submit' value='Submit Button' />
          <RB.Button bsStyle="primary" onClick={this.onCloseClick}>Close</RB.Button>
        </form>
      </div>
    );
  }
}

export default EditFile;
