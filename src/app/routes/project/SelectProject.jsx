import React from "react";
import { connect } from "react-redux";
import * as RB from "react-bootstrap";
import { selectProjectPath } from "./../../actions/project";
import { showNotification } from "./../../actions/notification";
import { showInfoModal } from "./../../actions/modal";

/**
 * project is name of directory which contain media files
 */
@connect(state => ({
}))
class SelectProject extends React.Component {

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
    return (
      <div className="row">
        <RB.Jumbotron className="text-center">
          <p>Please Select Media directory <small>select directory where are your media files</small></p>
          <p>
            <RB.Button bsStyle="primary" onClick={this.onCollectionPath} >Select</RB.Button>
          </p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default SelectProject;
