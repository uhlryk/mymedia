import React from "react";
import { Router, Route } from "react-router";

import Content from "./../components/Content.jsx";
import Project from "./Project.jsx";
import ProjectMedia from "./project/Media.jsx";

import ProjectSelect from "./project/SelectProject.jsx";
import ProjectMediaManage from "./project/media/Manage.jsx";

import ProjectFormElement from "./project/FormElement.jsx";
import ProjectFormElementManage from "./project/formElement/Manage.jsx";

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
            <Route path="formElement" component={ProjectFormElement}>
              <Route path="manage" component={ProjectFormElementManage} />
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
