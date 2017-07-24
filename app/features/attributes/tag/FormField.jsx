import React from "react";
import TagInput from "./TagInput.jsx";
import RemovableTag from "./RemovableTag.jsx";
import Tag from "./Tag.jsx";
import ReactTooltip from "react-tooltip";

export default class FormField extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    suggested: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleTypeTag = this.handleTypeTag.bind(this);
    this.state = {
      value: this.props.value || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState((prevState, props) => ({
        value: props.value || []
      }));
    }
  }

  handleRemoveTag(name) {
    this.props.onChange(this.state.value.filter(tag => tag !== name));
  }

  handleAddTag(name) {
    if (!name) {
      return;
    }
    this.props.onChange([...new Set([name].concat(this.state.value.filter(tag => typeof tag !== "object")))]);
  }

  handleTypeTag (name) {

    this.props.onChange((name ? [{
      value: name
    }] : []).concat(this.state.value.filter(tag => typeof tag !== "object")));

  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  render() {
    this.state.value.filter(tag => typeof tag !== "object").forEach(tag => this.props.suggested.delete(tag));
    const suggestedTags = Array.from(this.props.suggested);
    const tags = this.state.value
      .map(name => {
        if (typeof name === "object") {
          return (
            <Tag
              tooltip="manage-component"
              key={"n_" + name.value} className="tag--inline"
              name={name.value}
            />
          );
        } else {
          return (
            <RemovableTag
              tooltip="manage-component"
              key={"e_" + name} className="tag--inline"
              onClick={() => this.handleRemoveTag(name)}
              name={name}
            />
          );
        }
      });
    return (
      <div>
        {tags}
        <TagInput onAddTag={this.handleAddTag} onTypeTag={this.handleTypeTag} tagList={Array.from(suggestedTags)}/>
      </div>
    );
  }
}
