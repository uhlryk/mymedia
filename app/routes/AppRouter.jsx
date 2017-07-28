import React from "react";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";

import ProjectMedia from "./Media.jsx";

import ProjectMenu from "./ProjectMenu.jsx";
import ProjectCreate from "./ProjectCreate.jsx";

class AppRouter extends React.Component {
  render() {
    return (
      <div className="container">
        <Route path="/" component={ProjectMenu} />
        <Route path="/create/:encodedPath" component={ProjectCreate} />
        <Route path="/media" component={ProjectMedia} />
      </div>
    );
  }
}
export default AppRouter;
