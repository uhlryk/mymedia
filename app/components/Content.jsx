import React from "react";
import Notification from "./Notification.jsx";
import Loader from "./Loader.jsx";
import RegisterModals from "../features/modals/RegisterModals.jsx"

class Content extends React.Component {

  render() {
    return (
      <RegisterModals>
        <div className="container">
          {this.props.children}
        </div>
        <Loader />
        <Notification />
      </RegisterModals>
    );
  }
}

export default Content;
