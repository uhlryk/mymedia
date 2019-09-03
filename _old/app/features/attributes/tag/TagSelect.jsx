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

  onChange = name => {
    if (this.props.onChange) {
      this.props.onChange(name);
    }
    this.setState((prevState, props) => ({
      value: name
    }));
  };

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => ({
      tagList: prepareTags(props.tagList)
    }));
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
  return tagList.map(tagName => ({
    label: tagName,
    value: tagName
  }));
}
