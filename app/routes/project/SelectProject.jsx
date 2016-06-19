import React from "react";
import { connect } from "react-redux";
import * as RB from "react-bootstrap";
import { selectProjectPath } from "./../../actions/project";

/**
 * project is name of directory which contains media files
 */
@connect(state => ({
}))
class SelectProject extends React.Component {

  constructor(props) {
    super(props);
    this.onProjectPath = this.onProjectPath.bind(this);
  }

  onProjectPath() {
    this.props.dispatch(selectProjectPath());
  }

  render() {
    return (
      <div className="row">
        <RB.Jumbotron className="text-center">
          <p>Please Select Media directory <small>select directory where are your media files</small></p>
          <p>
            <RB.Button bsStyle="primary" onClick={this.onProjectPath} >Select</RB.Button>
          </p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default SelectProject;
