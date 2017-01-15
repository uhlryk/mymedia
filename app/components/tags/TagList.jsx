import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagSelect from "./TagSelect.jsx";
import RemovableTag from "./RemovableTag.jsx";
import ChangeableChargeTagWrapper from "./ChangeableChargeTagWrapper.jsx";
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
            <ChangeableChargeTagWrapper key={tagKey} onChange={()=>{}} isPositive={this.props.activeTagList[tagKey].charge} tag={RemovableTag} >
              <RemovableTag onClick={()=>this.removeTag(this.props.tagList[tagKey].uuid)} name={this.props.tagList[tagKey].name} />
            </ChangeableChargeTagWrapper>
          ))
        }
        <TagSelect onChange={this.handleAddTag} tagList={this.props.tagList} />
      </div>
    );
  }
}
export default TagList;
