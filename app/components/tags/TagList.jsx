import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import TagSelect from "./TagSelect.jsx";
import RemovableTag from "./RemovableTag.jsx";
import { addActiveTag, removeActiveTag } from "./../../actions/activeTagList";
import ReactTooltip from "react-tooltip";

@connect(state => ({
  tagList: state.tagList,
  activeTagList: state.activeTagList
}))
class TagList extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  removeTag(name) {
    this.props.dispatch(removeActiveTag(name));
  }

  handleAddTag(name) {
    this.props.dispatch(addActiveTag(name));
  }

  componentDidUpdate() {
    ReactTooltip.hide();
    ReactTooltip.rebuild();
  }

  render() {
    return (
      <div>
        <TagSelect onChange={this.handleAddTag} tagList={this.props.tagList} />
        { this.props.activeTagList.map(tagName => <RemovableTag key={tagName} onClick={()=>this.removeTag(tagName)} name={tagName} tooltip="tag-list" /> )
          }

        <ReactTooltip place="right" type="info" effect="float" class="tooltip" id="tag-list" />
      </div>
    );
  }
}
export default TagList;
