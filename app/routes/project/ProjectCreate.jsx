import React from "react";
import { connect } from "react-redux";
import { openProject } from "./../../actions/project";
import { push } from "react-router-redux";
/**
 * project is name of directory which contains media files
 */
@connect(state => ({
}))
class ProjectCreate extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        CREATE
      </div>
    );
  }
}

export default ProjectCreate;
