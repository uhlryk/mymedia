import React from "react";
import { connect } from "react-redux";
import Autosuggest from 'react-autosuggest';

@connect(state => ({}))
class TagInput extends React.Component {

  static propsTypes = {
    onAddTag: React.PropTypes.func,
    tagList: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      tagList: []
    };
    this.getTags = this.getTags.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onTagsFetchRequested = this.onTagsFetchRequested.bind(this);
    this.onTagsClearRequested = this.onTagsClearRequested.bind(this);
  }

  getTags(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : Object.keys(this.props.tagList).map(uuid => this.props.tagList[uuid]).filter(tag =>
      tag.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onClick() {
    this.props.onAddTag(this.state.value);
    this.setState({
      value: ""
    });
  }

  onTagsFetchRequested = ({ value }) => {
    this.setState({
      tagList: this.getTags(value)
    });
  };

  onTagsClearRequested = () => {
    this.setState({
      tagList: []
    });
  };

  render () {
    const { value, tagList } = this.state;
    const inputProps = {
      placeholder: 'Select tag',
      value,
      onChange: this.onChange
    };
    return (
      <div className="tag-autosuggest">
        <Autosuggest
          suggestions={tagList}
          onSuggestionsFetchRequested={this.onTagsFetchRequested}
          onSuggestionsClearRequested={this.onTagsClearRequested}
          getSuggestionValue={tag => tag.name}
          renderSuggestion={tag => <div> {tag.name} </div>}
          inputProps={inputProps}
        />
        <button type="button" className="form__button" onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

export default TagInput;
