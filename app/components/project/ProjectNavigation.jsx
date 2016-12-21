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
        {this.props.project.name}
        {this.props.project.path}
      </div>
    );
  }
}
export default ProjectNavigation;
