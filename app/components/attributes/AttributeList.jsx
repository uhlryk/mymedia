import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
  labelList: state.labelList
}))
class AttributeList extends React.Component {

  constructor(props) {
    super(props);
    this.onAddGroupClick = this.onAddGroupClick.bind(this);
  }

  onAddGroupClick() {
    this.props.dispatch(push("project/media/attribute/add-label"));
  }

  render() {
    let labelList = Object.keys(this.props.labelList).map(labelKey => <div key={labelKey}><span className="badge" >{this.props.labelList[labelKey].name}</span></div>);

    return (
      <div>
        {labelList}
        <RB.Button bsStyle="primary" onClick={this.onAddGroupClick}>Add</RB.Button>
      </div>
    );
  }
}
export default AttributeList;
