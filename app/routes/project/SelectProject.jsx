import React from "react";
import { connect } from "react-redux";
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
        <div className="jumbotron">
          <p>Please Select Media directory <small>select directory where are your media files</small></p>
          <p>
            <button onClick={this.onProjectPath} className="form__button">Select</button>
          </p>
        </div>
      </div>
    );
  }
}

export default SelectProject;
