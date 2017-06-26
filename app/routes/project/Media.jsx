import React from "react";
import { connect } from "react-redux";

import ProjectHeader from "../../components/project/ProjectHeader.jsx";
import Table from "../../components/resources/Table.jsx";
import sortResources from "../../features/sorting/sortResources";
import filterResources from "../../features/searching/filterResources";
import SortNavigation from "../../features/sorting/SortNavigation";
import SearchNavigation from "../../features/searching/SearchNavigation";

@connect(state => ({
  resources: state.resources,
  sort: state.sort,
  search: state.search,
  attributes: state.attributes
}))
class Media extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  render() {
    let list = Object.keys(this.props.resources).map(resourceId => {
      return this.props.resources[resourceId];
    });
    let sortedList = sortResources(list, this.props.sort, this.props.attributes, this.context.extensions);
    let filteredSortedList = filterResources(sortedList, this.props.search, this.props.attributes, this.context.extensions);
    let showResources;
    if(filteredSortedList.length) {
      showResources = <Table className="media__file-list file-list" results={filteredSortedList}/>
    } else {
      showResources = (
        <div className="row">
          <h2>Empty List</h2>
        </div>
      );
    }
    return (
      <div className="media">
        <div className="media__project">
          <ProjectHeader />
        </div>
        <div className="media__sidebar">
          <div>
            <SortNavigation />
            <SearchNavigation />
          </div>
        </div>
        {showResources}
      </div>
    );
  }

}

export default Media;
