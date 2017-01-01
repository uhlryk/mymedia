import React from "react";
import Select from 'react-select';

class TagSelect extends React.Component {

  static propsTypes = {
    onChange: React.PropTypes.func,
    tagList: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      value: null,
      tagList: prepareTags(props.tagList)
    };
  }

  onChange = newValue => {
    if (this.props.onChange) {
      this.props.onChange(newValue);
    }
    this.setState({
      value: newValue
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagList: prepareTags(nextProps.tagList)
    });
  }

  render () {
    const { tagList } = this.state;

    return (
      <Select
        simpleValue
        placeholder="Select tag"
        options={tagList}
        onChange={this.onChange}
      />
    );
  }
}

export default TagSelect;

function prepareTags(tagList) {
  const suggestions = [];
  Object.keys(tagList).forEach(hashPath => {
    suggestions.push({
      label: buildName(tagList, hashPath),
      value: hashPath
    })
  })
  return suggestions;
}

function buildName(tagList, hashPath) {
  let tag = tagList[hashPath];
  let name = tag.name.toLowerCase();
  if (tag.parent) {
    name = buildName(tagList, tag.parent) + " / " + name;
  }
  return name;
}
