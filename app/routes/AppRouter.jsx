import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

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
      <ConnectedRouter history={this.props.history}>
        <Route component={Content}>
          <Route path="project" component={Project} >
            <Route path="menu" component={ProjectMenu} />
            <Route path="create/:encodedPath" component={ProjectCreate} />
            <Route path="media" component={ProjectMedia} >
            </Route>
          </Route>
        </Route>
      </ConnectedRouter>
    );
  }
}
export default AppRouter;
