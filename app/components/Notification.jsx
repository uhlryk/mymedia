import React from "react";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";

class Notification extends React.Component {

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillUpdate(nextProps) {
    if(nextProps.notification) {
      this._notificationSystem.addNotification({
        message: nextProps.notification.message,
        title: nextProps.notification.title,
        level: nextProps.notification.level
      });
    }
    return false;
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

export default connect(state => ({
  notification: state.notification
}))(Notification);
export {
  Notification
}
