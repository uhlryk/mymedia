import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";


@connect(state => ({
  fileList: state.fileList
}))
class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose= this.onClickClose.bind(this);
  }

  onClickClose() {
    this.props.dispatch(push("project/media"));
  }

  render() {
    return (
      <div className="popup">
        <h1>select attribute type</h1>
        <RB.Button bsStyle="primary" >Label group</RB.Button>
        <RB.Button bsStyle="primary" >Rating</RB.Button>
        <RB.Button bsStyle="primary" onClick={this.onClickClose} >Cancel</RB.Button>
      </div>
    );
  }
}
export default AddGroup;
