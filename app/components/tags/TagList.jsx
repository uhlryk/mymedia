import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagSelect from "./TagSelect.jsx";
import Tag from "./Tag.jsx";
import { activatePositiveTag } from "./../../actions/activeTagList";

@connect(state => ({
  tagList: state.tagList,
  activeTagList: state.activeTagList
}))
class TagList extends React.Component {

  constructor(props) {
    super(props);
    this.onManageTagsClick = this.onManageTagsClick.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  onManageTagsClick() {
    this.props.dispatch(push("project/media/tag/add"));
  }

  handleAddTag(tagHash) {
    if(tagHash !== 0) {
      this.props.dispatch(activatePositiveTag(tagHash));
    }
  }

  render() {
    return (
      <div>
        { Object.keys(this.props.activeTagList)
          .map(tagKey => <Tag key={tagKey} name={this.props.tagList[tagKey].name} />)
          }
        <button className="button" onClick={this.onManageTagsClick}>Add</button>
        <TagSelect onChange={this.handleAddTag} />
      </div>
    );
  }
}
export default TagList;
