import React from "react";
import * as RB from "react-bootstrap";

class Info extends React.Component {

  static propsTypes = {
    title: React.PropTypes.string,
    message: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
    showModal: React.PropTypes.bool
  };

  render() {
    return (
      <RB.Modal show={this.props.showModal} onHide={this.close}>
        <RB.Modal.Header>
          <RB.Modal.Title>{this.props.title}</RB.Modal.Title>
        </RB.Modal.Header>

        <RB.Modal.Body>
          {this.props.message}
        </RB.Modal.Body>

        <RB.Modal.Footer>
          <RB.Button bsStyle="primary" onClick={this.props.onClick}>{this.props.label}</RB.Button>
        </RB.Modal.Footer>

      </RB.Modal>
    );
  }
}

export default Info;
