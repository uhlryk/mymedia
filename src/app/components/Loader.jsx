import React from "react";
import { connect } from "react-redux";
import TopMenu from "./TopMenu.jsx";

@connect(state => ({
  loader: state.loader
}))
class Loader extends React.Component {
  render() {
    if(this.props.loader && this.props.loader.show) {
      return (
        <div className="loader">
          <div className="loader__spinner"></div>
          <div className="loader__message">
            {this.props.loader.message}
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default Loader;
