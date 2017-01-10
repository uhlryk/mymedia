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
  Object.keys(tagList).forEach(uuid => {
    suggestions.push({
      label: tagList[uuid].name,
      value: uuid
    })
  })
  return suggestions;
}
