import React from "react";
import { Router, Route } from "react-router";

import Content from "./../Content.jsx";
import Project from "./Project.jsx";
import ProjectMedia from "./project/Media.jsx";

import ProjectMenu from "./project/ProjectMenu.jsx";
import ProjectCreate from "./project/ProjectCreate.jsx";

class AppRouter extends React.Component {
  static propTypes= {
    history: React.PropTypes.object
  };
  render() {
    return (
      <Router history={this.props.history}>
        <Route component={Content}>
          <Route path="project" component={Project} >
            <Route path="menu" component={ProjectMenu} />
            <Route path="create/:encodedPath" component={ProjectCreate} />
            <Route path="media" component={ProjectMedia} >
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
export default AppRouter;
