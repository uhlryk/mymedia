import React from "react";
import TagInput from "./TagInput.jsx";
import RemovableTag from "./RemovableTag.jsx";
import ReactTooltip from "react-tooltip";

export default class Edit extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.state = {
      value: this.props.value || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.value !== nextProps.value) {
      this.setState({
        value: nextProps.value ||  []
      }, () => {
        ReactTooltip.rebuild();
      });
    }
  }

  handleRemoveTag(name) {
    this.props.onChange({ target: { value: this.state.value.filter(tag => tag !== name )}});
  }

  handleAddTag(name) {
    if(!name) {
      return;
    }
    this.props.onChange({ target: { value: [...new Set([name].concat(this.state.value))]}});
  }

  render() {
    let suggestedTags = [];
    // const suggestedTags = this.props.tagList.filter(tagName => this.state.details.tags.indexOf(tagName) === -1);
    const tags = this.state.value
      .map(name =>
        <RemovableTag
          tooltip="manage-component"
          key={name} className="tag--inline"
          onClick={() => this.handleRemoveTag(name)}
          name={name}/>
      );
    return (
      <div>
        {tags}
        <TagInput onAddTag={this.handleAddTag} tagList={suggestedTags} />
      </div>
    );
  }
}
