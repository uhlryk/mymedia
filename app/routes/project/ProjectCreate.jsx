import React from "react";
import { connect } from "react-redux";
import { createProject } from "./../../actions/project";
import { push } from "react-router-redux";
import ValidationElementError from "../../components/ValidationElementError.jsx";
const defaultState = {
  details: {
    name: "",
    private: false,
    path: null
  },
  validation: {}
};

@connect(state => ({
}))
class ProjectCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePrivateChange = this.handlePrivateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value})
    });
  }

  handlePrivateChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { private: !this.state.details.private})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(createProject(this.state.details.name, this.state.details.private, this.state.details.path));
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label>Project name</label>
            <input
              type="text"
              className="form__element"
              value={this.state.details.name}
              onChange={this.handleNameChange}
              placeholder="Enter name"
            />
            <ValidationElementError error={this.state.validation.name} />
          </div>
          <div className="form__group">
            <div className="checkbox">
              <label>
              <input
                type="checkbox"
                checked={this.state.details.private}
                onChange={this.handlePrivateChange}
              />
                Project is private</label>
            </div>
          </div>
          <button type="submit" className="form__button">Create</button>
        </form>
      </div>
    );
  }
}

export default ProjectCreate;
