import React from "react";
import classNames from "classnames";

class Modal extends React.Component {
  static propsTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    message: React.PropTypes.string,
    body:React.PropTypes.arrayOf(React.PropTypes.shape({
      Component: React.PropTypes.component,
      props: React.PropTypes.object
    })),
    onCloseClick: React.PropTypes.func.isRequired,
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
      open: false
    }
  }

  render() {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.onCloseClick} data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.body ? <this.props.body.Component {...this.props.body.props}/> : this.props.message }
            </div>
            <div className="modal-footer">
              {
                this.props.buttons && this.props.buttons.map(button => (
                  <button onClick={button.onClick} key={button.key || (button.className + button.label)} type="button" className={classNames("btn", button.className)} data-dismiss="modal">{button.label}</button>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
