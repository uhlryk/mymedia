import React from "react";
import Notification from "./Notification.jsx";
import TopMenu from "./TopMenu.jsx";
import Loader from "./Loader.jsx";
import Modal from "./modals/Modal.jsx";

class Content extends React.Component {

  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
        <Loader />
        <Modal />
        <Notification />
      </div>
    );
  }
}

export default Content;
