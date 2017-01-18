import React from "react";
import ReactDOM from "react-dom";
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
    this.onKeyPress = this.onKeyPress.bind(this);
    this.addTag = this.addTag.bind(this);
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
    this.addTag();
  }

  addTag() {
    this.props.onAddTag(this.state.value);
    this.setState({
      value: ""
    });
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      event.stopPropagation()
      event.preventDefault();
      this.addTag();
    }
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
          getSuggestionValue={tag => tag.name}
          renderSuggestion={tag => <div> {tag.name} </div>}
          inputProps={inputProps}
          ref={(input) => { this.textInput = input; }}
        />
        <button type="button" className="form__button" onClick={this.onClick}>Add</button>
      </div>
    );
  }
}

export default TagInput;
