import React from "react";
import { connect } from "react-redux";

import ProjectNavigation from "../../components/project/ProjectNavigation.jsx";
import Table from "../../components/files/Table.jsx";
import sortResources from "../../features/sorting/sortResources";
import SortNavigation from "../../features/sorting/SortNavigation";
import SearchNavigation from "../../features/searching/SearchNavigation";

@connect(state => ({
  fileList: state.fileList,
  sort: state.sort,
  attributes: state.attributes
}))
class Media extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  render() {
    let list = Object.keys(this.props.fileList).map(filePath => {
      return this.props.fileList[filePath];
    });
    let sortedList = sortResources(list, this.props.sort, this.props.attributes, this.context.extensions);

    let showResources;
    if(sortedList.length) {
      showResources = <Table className="media__file-list file-list" results={sortedList}/>
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
          <ProjectNavigation />
        </div>
        <div className="media__sidebar">
          <div>
            <SortNavigation />
            <SearchNavigation />
          </div>
        </div>
        {showResources}
        <div className="media__popup">
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default Media;
