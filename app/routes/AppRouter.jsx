import React from "react";
import { Router, Route } from "react-router";

import Content from "./../Content.jsx";
import Project from "./Project.jsx";
import ProjectMedia from "./project/Media.jsx";

import ProjectMenu from "./project/ProjectMenu.jsx";
import ProjectCreate from "./project/ProjectCreate.jsx";
import ProjectMediaManage from "./project/media/Manage.jsx";

import ProjectAttribute from "./project/Attribute.jsx";
import ProjectAttributeManage from "./project/attribute/Manage.jsx";

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
            <Route path="attribute" component={ProjectAttribute}>
              <Route path="manage" component={ProjectAttributeManage} />
            </Route>
            <Route path="media" component={ProjectMedia} >
              <Route path="manage/:hashPath" component={ProjectMediaManage} />
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
export default AppRouter;
