import React from 'react';
import Modal from "./Modal.jsx";
import uuid from "uuid-v4";

class RegisterModals extends React.Component {

  static childContextTypes = {
    modals: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      modals: {}
    };
    this.modals = {
      showModal: (props) => {
        const id = uuid();
        this.setState({
          modals: Object.assign({}, this.state.modals, { [id]: props})
        });
        return id;
      }
    }
  }

  getChildContext() {
    return {
      modals: this.modals
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
        {Object.keys(this.state.modals).map(id => <Modal key={id} {...this.state.modals[id]} />)}
      </div>
    )
  }
}

export default RegisterModals;
