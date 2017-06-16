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
    closeModal: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
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
            <this.props.body.Component {...this.props.body.props} closeModal={this.props.closeModal}/>
          </div>
        </div>
      </div>
    );
  }
}

export default FormModal;
