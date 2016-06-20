import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as RB from "react-bootstrap";
import FileSize from "./FileSize.jsx";
import DateDisplay from "./DateDisplay.jsx";

@connect(state => ({
}))
class CustomRow extends React.Component {

  constructor(props) {
    super(props);
    this.onEditClick = this.onEditClick.bind(this);
  }

  onEditClick() {
    this.props.dispatch(push("project/media/edit-file/" + this.props.data.hashPath));
  }

  render() {

    return (
      <div className="list__row">
        <div className="list__name">{this.props.data.name}</div>
        <div className="list__original-path">{this.props.data.path}</div>
        <div className="list__size">
          <FileSize data={this.props.data.size} />
        </div>
        <div className="list__birthtime">
          <DateDisplay data={this.props.data.birthtime} />
        </div>
        <div className="list__description">
          <DateDisplay data={this.props.data.description} />
        </div>
        <div className="list__actions">
          <RB.Button bsStyle="primary" onClick={this.onEditClick} >Edit</RB.Button>
        </div>
      </div>
    );
  }
}
export default CustomRow;
