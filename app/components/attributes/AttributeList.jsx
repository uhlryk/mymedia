import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
  labelList: state.labelList
}))
class Media extends React.Component {

  constructor(props) {
    super(props);
    this.onAddGroupClick = this.onAddGroupClick.bind(this);
  }

  onAddGroupClick() {
    this.props.dispatch(push("project/media/attribute/select-type"));
  }

  render() {
    let labelList = Object.keys(this.props.labelList).map(labelKey => <div key={labelKey}>{this.props.labelList[labelKey].name}</div>);

    return (
      <div>
        {labelList}
        <RB.Button bsStyle="primary" onClick={this.onAddGroupClick}>Add</RB.Button>
      </div>
    );
  }
}
export default Media;
