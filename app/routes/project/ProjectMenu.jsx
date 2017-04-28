import React from "react";
import { connect } from "react-redux";
import { openProject } from "./../../actions/project";
import { loadProjectsFromPesistence, clearProjects } from "./../../actions/projects";
import { push } from "react-router-redux";

/**
 * project is name of directory which contains media files
 */
@connect(state => ({
  projects: state.projects,
}))
class ProjectMenu extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onOpenProjectPath = this.onOpenProjectPath.bind(this);
    this.onClearProjectPath = this.onClearProjectPath.bind(this);
  }

  onOpenProjectPath() {
    this.props.dispatch(openProject(this.context.extensions));
  }

  onClearProjectPath() {
    this.props.dispatch(clearProjects());
  }


  componentDidMount() {
    this.props.dispatch(loadProjectsFromPesistence());
  }

  render() {
    const projects = this.props.projects.map(project => (
      <tr key={project.path}>
        <td>{project.name}</td>
        <td>{project.path}</td>
        <td>{project.projectExtensionName}</td>
      </tr>
    ));
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
        {projects.length ? (
          <div>
            <div className="row">
              <div className="col-xs-12">
                <p>Select project:</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <table className="table table-striped table-hover table-bordered">
                  <tbody>
                  {projects}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-8">
                <p>Clear collection directory</p>
              </div>
              <div className="col-xs-4">
                <button onClick={this.onClearProjectPath} className="form__button">Clear</button>
              </div>
            </div>
          </div>
        ): <div> No projects</div>}
      </div>
    );
  }
}

export default ProjectMenu;
