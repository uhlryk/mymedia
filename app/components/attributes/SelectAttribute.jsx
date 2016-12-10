import React from "react";
import { connect } from "react-redux";
import Select from 'react-select';

@connect(state => ({
  labelList: state.labelList
}))
class AutoSuggestAttribute extends React.Component {

  static propsTypes = {
    onChange: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      labels: prepareLabels(props.labelList),
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

  render () {
    const { labels } = this.state;

    console.log(labels);
    return (
      <Select
        simpleValue
        value={this.state.value}
        options={labels}
        onChange={this.onChange}
      />
    );
  }
}

export default AutoSuggestAttribute;

function prepareLabels(labels) {
  const suggestions = [{
    label: "no parent",
    value: 0
  }];
  Object.keys(labels).forEach(hashPath => {
    suggestions.push({
      label: buildName(labels, hashPath),
      value: hashPath
    })
  })
  return suggestions;
}

function buildName(labels, hashPath) {
  let label = labels[hashPath];
  let name = label.name.toLowerCase();
  if (label.parent) {
    name = buildName(labels, label.parent) + " / " + name;
  }
  return name;
}
