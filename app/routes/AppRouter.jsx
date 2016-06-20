import React from "react";
import { Router, Route } from "react-router";

import Content from "./../components/Content.jsx";
import Project from "./Project.jsx";
import ProjectMedia from "./project/Media.jsx";

import ProjectSelect from "./project/SelectProject.jsx";
import ProjectMediaEditFile from "./project/media/EditFile.jsx";

class AppRouter extends React.Component {
  static propTypes= {
    history: React.PropTypes.object
  };
  render() {
    return (
      <Router history={this.props.history}>
        <Route component={Content}>
          <Route path="project" component={Project} >
            <Route path="select" component={ProjectSelect} />
            <Route path="media" component={ProjectMedia} >
              <Route path="edit-file/:hashPath" component={ProjectMediaEditFile} />
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
export default AppRouter;
