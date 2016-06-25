import React from "react";
import { Router, Route } from "react-router";

import Content from "./../components/Content.jsx";
import Project from "./Project.jsx";
import ProjectMedia from "./project/Media.jsx";
import ProjectMediaAttribute from "./project/media/Attribute.jsx";

import ProjectSelect from "./project/SelectProject.jsx";
import ProjectMediaEditFile from "./project/media/EditFile.jsx";

import ProjectMediaAttributeSelectType from "./project/media/attribute/SelectType.jsx";
import ProjectMediaAttributeLabelForm from "./project/media/attribute/LabelForm.jsx";

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
              <Route path="attribute" component={ProjectMediaAttribute} >
                <Route path="select-type" component={ProjectMediaAttributeSelectType} />
                <Route path="add-label" component={ProjectMediaAttributeLabelForm} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
}
export default AppRouter;
