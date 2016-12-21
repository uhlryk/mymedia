import React from "react";
import * as RB from "react-bootstrap";
import { connect } from "react-redux";
import { push } from "react-router-redux";

@connect(state => ({
  tagList: state.tagList
}))
class TagList extends React.Component {

  constructor(props) {
    super(props);
    this.onAddGroupClick = this.onAddGroupClick.bind(this);
  }

  onAddGroupClick() {
    this.props.dispatch(push("project/media/tag/add"));
  }

  render() {
    let tagList = Object.keys(this.props.tagList).map(tagKey => <div key={tagKey}><span className="badge" >{this.props.tagList[tagKey].name}</span></div>);

    return (
      <div>
        {tagList}
        <RB.Button bsStyle="primary" onClick={this.onAddGroupClick}>Add</RB.Button>
      </div>
    );
  }
}
export default TagList;
