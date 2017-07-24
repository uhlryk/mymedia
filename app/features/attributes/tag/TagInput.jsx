import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Autosuggest from 'react-autosuggest';

class TagInput extends React.Component {

  static propsTypes = {
    onAddTag: React.PropTypes.func,
    onTypeTag: React.PropTypes.func,
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
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onTagSelected = this.onTagSelected.bind(this);
  }

  getTags(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.props.tagList.filter(tagName =>
      tagName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  onChange(event, { newValue }) {
    this.setState((prevState, props) => ({
      value: newValue
    }), () => {
      this.props.onTypeTag(this.state.value);
    });
  };

  onClick() {
    this.props.onAddTag(this.state.value);
    this.setState((prevState, props) => ({
      value: ""
    }));
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      event.stopPropagation()
      event.preventDefault();
      this.props.onAddTag(this.state.value);
      this.setState((prevState, props) => ({
        value: ""
      }));
    }
  }

  onTagsFetchRequested({ value }) {
    this.setState((prevState, props) => ({
      tagList: this.getTags(value)
    }));
  };

  onTagsClearRequested() {
    this.setState((prevState, props) => ({
      tagList: []
    }));
  };

  onTagSelected(event, { suggestionValue }) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onAddTag(suggestionValue);
    this.setState((prevState, props) => ({
      value: ""
    }));
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    const addEvent = node.addEventListener || node.attachEvent;
    addEvent("keypress", this.onKeyPress, false);
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    const removeEvent = node.removeEventListener || node.detachEvent;
    removeEvent("keypress", this.onKeyPress);
  }

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
          getSuggestionValue={tagName => tagName}
          renderSuggestion={tagName => <div> {tagName} </div>}
          inputProps={inputProps}
          onSuggestionSelected={this.onTagSelected}
        />
        <button type="button" className="button button--secondary" onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

export default TagInput;
