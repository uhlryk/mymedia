import React from "react";
import TopMenu from "./TopMenu.jsx";
import Loader from "./Loader.jsx";

class Content extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
        <Loader />
      </div>
    );
  }
}

export default Content;
