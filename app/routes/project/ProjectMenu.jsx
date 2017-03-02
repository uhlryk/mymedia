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

  constructor(props) {
    super(props);
    this.onSelectProjectPath = this.onSelectProjectPath.bind(this);
    this.onCreateProject = this.onCreateProject.bind(this);
  }

  onSelectProjectPath() {
    this.props.dispatch(openProject());
  }

  onCreateProject() {
    this.props.dispatch(push("project/create"));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-8">
            <h2>Create new project</h2>
          </div>
          <div className="col-xs-4">
            <button onClick={this.onCreateProject} className="form__button">Select Path</button>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h2>Select project:</h2>
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
        <div className="row">
          <div className="col-xs-8">
            <h2>Open existing project</h2>
          </div>
          <div className="col-xs-4">
            <button onClick={this.onSelectProjectPath} className="form__button">Select Path</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectMenu;
