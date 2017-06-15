import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Form from "../../../components/files/Form.jsx";
import * as formType from "../../../constants/formType";
import { updateResource, addResource } from "../../../actions/fileList";
import ReactTooltip from "react-tooltip";
@connect(state => ({
  fileList: state.fileList
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      mode : this.props.params.hashPath ? formType.EDIT : formType.CREATE
    }
    console.log("A1");
  }

  onCloseClick() {
    this.props.dispatch(push("project/media"));
  }

  handleSubmit(details) {
    switch(this.state.mode) {
      case formType.EDIT:
        this.props.dispatch(updateResource(this.props.params.hashPath, details));
        break;
      case formType.CREATE:
        this.props.dispatch(addResource(details));
        break;
    }
    this.props.dispatch(push("project/media"));
  }

  render() {
    let data;
    switch(this.state.mode) {
      case formType.EDIT:
        data = Object.assign({}, this.props.fileList[this.props.params.hashPath]);
        break;
      case formType.CREATE:
        data = {};
        break;
    }
    return (
      <div className="popup form">
        <div className="popup__header">
          <div className="popup__title">Manage file</div>
          <div className="popup__back-button-wrapper">
            <button type="button" className="form__button" onClick={this.onCloseClick}>Back</button>
          </div>
        </div>
        <Form submit={this.handleSubmit} data={data} mode={this.state.mode}/>
        <ReactTooltip place="top" type="info" effect="float" id="manage-component" class="tooltip"/>
      </div>
    );
  }
}

export default Manage;
