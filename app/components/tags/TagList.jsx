import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagSelect from "./TagSelect.jsx";
import RemovableTag from "./RemovableTag.jsx";
import ChangeableTagWrapper from "./ChangeableTagWrapper.jsx";
import { addPositiveActiveTag, removeActiveTag } from "./../../actions/activeTagList";

@connect(state => ({
  tagList: state.tagList,
  activeTagList: state.activeTagList
}))
class TagList extends React.Component {

  constructor(props) {
    super(props);
    this.onManageTagsClick = this.onManageTagsClick.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  onManageTagsClick() {
    this.props.dispatch(push("project/media/tag/add"));
  }

  removeTag(tagHash) {
    this.props.dispatch(removeActiveTag(tagHash));
  }

  handleAddTag(tagHash) {
    this.props.dispatch(addPositiveActiveTag(tagHash));
  }

  render() {
    return (
      <div>
        { Object.keys(this.props.activeTagList)
          .map(tagKey => (
            <ChangeableTagWrapper key={tagKey} onChange={()=>{}} isPositive={true} >
              <RemovableTag onClick={()=>this.removeTag(this.props.tagList[tagKey].uuid)} name={this.props.tagList[tagKey].name} />
            </ChangeableTagWrapper>
          ))
        }
        <button className="button" onClick={this.onManageTagsClick}>Add</button>
        <TagSelect onChange={this.handleAddTag} tagList={this.props.tagList} />
      </div>
    );
  }
}
export default TagList;
