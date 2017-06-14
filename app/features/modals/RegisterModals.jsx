import React from 'react';
import Modal from "./Modal.jsx";
import uuid from "uuid-v4";

class RegisterModals extends React.Component {

  static childContextTypes = {
    modals: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      list: []
    };
    this.modals = {
      showModal (props = {}) {
        props.id = props.id || uuid();
        props.onCloseClick = props.onCloseClick || this.hideModal.bind(this, props.id);
        self.setState(prevState => ({
          list: prevState.list.concat(props)
        }));
        return props.id;
      },
      hideModal (id) {
        self.setState(prevState => ({
          list: id !== undefined ? prevState.list.filter(modal => modal.id !== id) : prevState.list.slice(0, -1)
        }));
      }
    }
  }

  getChildContext() {
    return {
      modals: this.modals
    }
  }

  componentDidUpdate() {
    if (this.state.list.length) {
      document.body.classList.toggle("body__modal--no-scroll", true);
    } else {
      document.body.classList.toggle("body__modal--no-scroll", false);
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.state.list.map(props => <Modal key={props.id} {...props} />)}
      </div>
    )
  }
}

export default RegisterModals;
