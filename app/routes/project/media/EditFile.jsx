import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
}))
class EditFile extends React.Component {

  constructor(props) {
    super(props);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media"));
  }

  render() {
    console.log(this.props);
    return (
      <div className="edit-form">
        <div>
          {this.props.params.hashPath}
        </div>
        <div>
          <RB.Button bsStyle="primary" onClick={this.onCloseClick}>Close</RB.Button>
        </div>
      </div>
    );
  }
}

export default EditFile;
