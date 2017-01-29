import React from "react";
import * as RB from "react-bootstrap";
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
          {this.props.project.name}
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
