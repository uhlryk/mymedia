import React from "react";
import { Router, Route } from "react-router";

import Content from "./../components/Content.jsx";
import Project from "./Project.jsx";
import ProjectMedia from "./project/Media.jsx";
import ProjectMediaTag from "./project/media/Tag.jsx";

import ProjectSelect from "./project/SelectProject.jsx";
import ProjectMediaEdit from "./project/media/Edit.jsx";
import ProjectMediaTagManage from "./project/media/tag/Manage.jsx";
import ProjectMediaTagForm from "./project/media/tag/Form.jsx";

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
              <Route path="edit/:hashPath" component={ProjectMediaEdit} />
              <Route path="tag" component={ProjectMediaTag} >
                <Route path="add" component={ProjectMediaTagForm} />
                <Route path="manage/:hashPath" component={ProjectMediaTagManage} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
export default AppRouter;
