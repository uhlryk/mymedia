import React from "react";
import { connect } from "react-redux";

class Loader extends React.Component {
  render() {
    if(this.props.loader) {
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

export default connect(state => ({
  loader: state.loader
}))(Loader);
export {
  Loader
}