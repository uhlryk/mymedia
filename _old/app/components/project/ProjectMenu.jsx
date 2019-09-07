import React from "react";
import { connect } from "react-redux";
import { openProject, openProjectByPath } from "../../actions/project";
import { loadProjectsFromPesistence, clearProjects } from "../../actions/projects";
import { push } from "react-router-redux";
import Header from "../Header.jsx";
/**
 * project is name of directory which contains media files
 */
class ProjectMenu extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onOpenProjectPath = this.onOpenProjectPath.bind(this);
    this.onOpenProjectFromList = this.onOpenProjectFromList.bind(this);
    this.onClearProjectPath = this.onClearProjectPath.bind(this);
  }

  onOpenProjectPath() {
    this.props.dispatch(openProject());
  }

  onOpenProjectFromList(path) {
    this.props.dispatch(openProjectByPath(path));
  }

  onClearProjectPath() {
    this.props.dispatch(clearProjects());
  }


  componentDidMount() {
    this.props.dispatch(loadProjectsFromPesistence());
  }

  render() {
    const projects = this.props.projects.map(project => (
      <tr key={project.path} onClick={() => this.onOpenProjectFromList(project.path)}>
        <td>{project.name}</td>
        <td>{project.path}</td>
        <td>{project.projectExtensionName}</td>
      </tr>
    ));
    return (
      <div className="project-menu">
        <div className="project-menu__header">
          <Header branding="Projects">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" onClick={ this.onOpenProjectPath }>Open directory</a></li>
              <li><a href="#" onClick={ this.onClearProjectPath }>Clear</a></li>

            </ul>
          </Header>
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
          </div>
        ): <div> No projects</div>}
      </div>
    );
  }
}

export default connect(state => ({
  projects: state.projects,
}))(ProjectMenu);
export {
  ProjectMenu
}