import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
}))
class Media extends React.Component {

  constructor(props) {
    super(props);
    this.onAddGroupClick = this.onAddGroupClick.bind(this);
  }

  onAddGroupClick() {
    this.props.dispatch(push("project/media/attribute/add-group"));
  }

  render() {
    return (
      <RB.Button bsStyle="primary" onClick={this.onAddGroupClick}>Add</RB.Button>
    );
  }
}
export default Media;
