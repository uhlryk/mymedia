import React from "react";
import { connect } from "react-redux";
import { openProject } from "./../../actions/project";
import { push } from "react-router-redux";
/**
 * project is name of directory which contains media files
 */
@connect(state => ({
}))
class ProjectMenu extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onOpenProjectPath = this.onOpenProjectPath.bind(this);
  }

  onOpenProjectPath() {
    this.props.dispatch(openProject(this.context.extensions));
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-8">
            <p>Open collection directory</p>
          </div>
          <div className="col-xs-4">
            <button onClick={this.onOpenProjectPath} className="form__button">Open directory</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>Select project:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <table className="table table-striped table-hover table-bordered">
              <tbody>
                <tr>
                  <td>First project</td>
                  <td>some project path</td>
                </tr>
                <tr>
                  <td>First project</td>
                  <td>some project path</td>
                </tr>
                <tr>
                  <td>First project</td>
                  <td>some project path</td>
                </tr>
                <tr>
                  <td>First project</td>
                  <td>some project path</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectMenu;
