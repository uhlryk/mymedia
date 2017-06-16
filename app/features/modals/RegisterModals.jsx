import React from 'react';
import FormModal from "./FormModal.jsx";
import uuid from "uuid-v4";

class RegisterModals extends React.Component {

  static childContextTypes = {
    modals: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    const self = this;
    this.state = {
      list: [],
      modals: {
        "formModal": FormModal
      }
    };
    this.modals = {
      showModal (modalTypeName, modalProps = {}) {
        const props = {};
        props.id = modalProps.id || uuid();
        modalProps.id = props.id;
        props.closeModal = this.hideModal.bind(this, props.id);
        props.onCloseClick = modalProps.onCloseClick || props.closeModal;
        props.modalProps = modalProps;
        props.modalTypeName = modalTypeName;
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
        {this.state.list.map(props => React.createFactory(this.state.modals[props.modalTypeName])({
          key: props.id,
          closeModal: props.closeModal,
          onCloseClick: props.onCloseClick,
          ...props.modalProps
        }))}
      </div>
    )
  }
}

export default RegisterModals;
