import React from "react";
import { Router, Route } from "react-router";

import Content from "./../components/Content.jsx";
import SelectProject from "./../components/pages/SelectProject.jsx";
import MediaList from "./../components/pages/MediaList.jsx";



class AppRouter extends React.Component {
  static propTypes= {
    history: React.PropTypes.object
  };
  render() {
    return (
      <Router history={this.props.history}>
        <Route component={Content}>
          <Route path="/" component={SelectProject} />
          <Route path="list" component={MediaList} />
        </Route>
      </Router>
    );
  }
}
export default AppRouter;
