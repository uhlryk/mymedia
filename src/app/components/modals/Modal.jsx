import React from "react";
import { connect } from "react-redux";
import * as RB from "react-bootstrap";
import { closeModal } from "./../../actions/modal";
import * as MODAL_TYPE from "./../../constants/modalType"
import Info from "./Info.jsx";
import YesNo from "./YesNo.jsx";

@connect(state => ({
  modal: state.modal
}))
class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.onClickYes = this.onClickYes.bind(this);
    this.onClickNo = this.onClickNo.bind(this);
  }

  onClickYes() {
    if(this.props.modal.onClickYes) {
      this.props.modal.onClickYes();
    }
    this.props.dispatch(closeModal());
  }

  onClickNo() {
    if(this.props.modal.onClickNo) {
      this.props.modal.onClickNo();
    }
    this.props.dispatch(closeModal());
  }

  render() {
    if(this.props.modal) {
      let modal = null;
      switch (this.props.modal.modalType) {
        case MODAL_TYPE.YES_NO:
          modal = (
            <YesNo
              title={this.props.modal.title}
              message={this.props.modal.message}
              labelYes={this.props.modal.labelYes}
              labelNo={this.props.modal.labelNo}
              showModal={this.props.modal.show}
              onClickYes={this.onClickYes}
              onClickNo={this.onClickNo}
            />
          );
          break;
        case MODAL_TYPE.INFO:
        default:
          modal = (
            <Info
              title={this.props.modal.title}
              message={this.props.modal.message}
              label={this.props.modal.label}
              showModal={this.props.modal.show}
              onClick={this.onClickYes}
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
