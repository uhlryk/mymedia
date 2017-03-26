import React from "react";
import Notification from "./components/Notification.jsx";
import Loader from "./components/Loader.jsx";
import RegisterModals from "./features/modals/RegisterModals.jsx"
import RegisterExtensions from "./features/RegisterExtensions.jsx"
import * as extensions from "./extensions";

class Content extends React.Component {

  render() {
    return (
      <RegisterExtensions list={extensions}>
        <RegisterModals>
          <div className="container">
            {this.props.children}
          </div>
          <Loader />
          <Notification />
        </RegisterModals>
      </RegisterExtensions>
    );
  }
}

export default Content;
