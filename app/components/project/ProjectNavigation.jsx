import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
  project: state.project
}))
class ProjectNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div>
          <strong>{this.props.project.name}</strong>
          {this.props.project.path}
        </div>
        <div>
          <button onClick={() => this.props.dispatch(push("project/formElement/manage"))}>form elements</button>
        </div>
      </div>
    );
  }
}
export default ProjectNavigation;
