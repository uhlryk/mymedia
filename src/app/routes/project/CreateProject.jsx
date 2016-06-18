import React from "react";
import { connect } from "react-redux";
import * as RB from "react-bootstrap";
import { selectProjectPath } from "./../../actions/project";

@connect(state => ({
}))
class CreateProject extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onCollectionPath = this.onCollectionPath.bind(this);
  }

  onCollectionPath() {
    this.props.dispatch(selectProjectPath());
  }

  render() {
    return false;
  }
}

export default CreateProject;
