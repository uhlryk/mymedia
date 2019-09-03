import React from "react";
import { Route } from "react-router";

import ProjectResource from "./components/resources/Resource.jsx";

import ProjectMenu from "./components/project/ProjectMenu.jsx";
import ProjectCreate from "./components/project/ProjectCreate.jsx";

class AppRouter extends React.Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={ProjectMenu} />
        <Route path="/create/:encodedPath" component={ProjectCreate} />
        <Route path="/resource" component={ProjectResource} />
      </div>
    );
  }
}
export default AppRouter;
