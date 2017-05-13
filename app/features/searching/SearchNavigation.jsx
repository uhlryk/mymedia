import React from "react";
import { connect } from "react-redux";
import { addSearch } from "../../actions/search";

const defaultState = {
  details: {
    quickSearch: ""
  }
};

@connect(state => ({
  search: state.sort
}))
class SearchNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(evt) {
    const value = evt.target.value;
    this.setState((prevState, props) => ({
      details: Object.assign({}, prevState.details, { quickSearch: value})
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const value = this.state.details.quickSearch;
    console.log("AAAAA", value);
    this.setState((prevState, props) => defaultState, () => this.props.dispatch(addSearch("quickSearch", value)));
  }

  render() {

    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label>Quick search</label>
            <input
              type="text"
              className="form__element"
              placeholder=""
              value={this.state.details.quickSearch}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="form__button">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchNavigation;
