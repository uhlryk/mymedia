import React from "react";
import { connect } from "react-redux";
import { createProject } from "./../../actions/project";
import ValidationElementError from "../../components/ValidationElementError.jsx";
const defaultState = {
  details: {
    name: "",
    isHidden: false,
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
    this.state.details.path = decodeURIComponent(this.props.params.encodedPath);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value})
    });
  }

  handleVisibilityChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { isHidden: !this.state.details.isHidden})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(createProject(this.state.details.path, this.state.details.name, this.state.details.isHidden));
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
                checked={this.state.details.isHidden}
                onChange={this.handleVisibilityChange}
              />
                hidden project</label>
            </div>
          </div>
          <div className="form__group">
            <div><small>Project location</small></div>
            <div><strong>{this.state.details.path}</strong></div>
          </div>
          <button type="submit" className="form__button">Create</button>
        </form>
      </div>
    );
  }
}

export default ProjectCreate;
