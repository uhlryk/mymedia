import React from "react";
import classNames from "classnames";

class FormModal extends React.Component {
  static propsTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    body:React.PropTypes.arrayOf(React.PropTypes.shape({
      Component: React.PropTypes.component,
      props: React.PropTypes.object
    })),
    onCloseClick: React.PropTypes.func.isRequired,
    closeModal: React.PropTypes.func.isRequired,
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
      className: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func.isRequired,
      key: React.PropTypes.string
    }))
  };

  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <h4 className="modal__title">{this.props.title}</h4>
            <button type="button" className="modal__button-close" onClick={this.props.onCloseClick} ><i className="fa fa-times fa-lg" aria-hidden="true"></i></button>
          </div>
          <this.props.body.Component {...this.props.body.props} closeModal={this.props.closeModal}/>
          <div className="modal__footer">
            {
              this.props.buttons && this.props.buttons.map(button => (
                <button onClick={button.onClick} key={button.key || (button.className + button.label)} type="button" className={classNames("button", button.className)}>{button.label}</button>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FormModal;
