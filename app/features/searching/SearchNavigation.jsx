import React from "react";
import { connect } from "react-redux";
import { addSort, removeSort, changeOrderSort } from "../../actions/sort";

@connect(state => ({
  attributes: state.attributes,
  sort: state.sort
}))
class SearchNavigation extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>

      </div>
    );
  }
}

export default SearchNavigation;
