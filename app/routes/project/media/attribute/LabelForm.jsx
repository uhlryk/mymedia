import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { addLabel } from "../../../../actions/labelList";

@connect(state => ({
}))
class LabelForm extends React.Component {

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media/attribute/select-type"));
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
    this.props.dispatch(addLabel(this.state.details));
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
            <label>Select parent</label>
            <input type="text" className="form-control" value={this.state.details.name} onChange={this.handleNameChange} placeholder="Enter name" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
          <button type="button" className="btn btn-default" onClick={this.onCloseClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default LabelForm;
