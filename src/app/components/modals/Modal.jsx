import React from "react";
import { connect } from "react-redux";
import * as RB from "react-bootstrap";
import { closeModal } from "./../../actions/modal";
import * as MODAL_TYPE from "./../../constants/modalType"
import Info from "./Info.jsx";

@connect(state => ({
  modal: state.modal
}))
class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if(this.props.modal.onClick) {
      this.props.modal.onClick();
    }
    this.props.dispatch(closeModal());
  }

  render() {
    if(this.props.modal) {
      let modal = null;
      switch (this.props.modal.type) {
        case MODAL_TYPE.INFO:
        default:
          modal = (
            <Info
              title={this.props.modal.title}
              message={this.props.modal.message}
              label={this.props.modal.label}
              showModal={this.props.modal.show}
              onClick={this.onClick}
            />
          );
      }
      return modal;
    } else {
      return false;
    }
  }
}

export default Modal;
