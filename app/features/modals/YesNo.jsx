import React from "react";
import Modal from "./Modal.jsx";

class YesNo extends React.Component {

  static propsTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    labelYes: React.PropTypes.string,
    labelNo: React.PropTypes.string,
    onClickYes: React.PropTypes.func,
    onClickNo: React.PropTypes.func,
    showModal: React.PropTypes.bool
  };

  render() {
    const buttons = [

    ];

    return (
      <RB.Modal show={this.props.showModal} onHide={this.close}>
        <RB.Modal.Header>
          <RB.Modal.Title>{this.props.title}</RB.Modal.Title>
        </RB.Modal.Header>

        <RB.Modal.Body>
          {this.props.message}
        </RB.Modal.Body>

        <RB.Modal.Footer>
          <RB.Button bsStyle="primary" onClick={this.props.onClickYes}>{this.props.labelYes}</RB.Button>
          <RB.Button bsStyle="primary" onClick={this.props.onClickNo}>{this.props.labelNo}</RB.Button>
        </RB.Modal.Footer>

      </RB.Modal>
    );
  }
}

export default YesNo;
