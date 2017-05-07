import React from "react";
import { connect } from "react-redux";

import ProjectNavigation from "../../components/project/ProjectNavigation.jsx";
import Table from "../../components/files/Table.jsx";

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

    if(sortedList.length) {
      return (
        <div className="media">
          <div className="media__project">
            <ProjectNavigation />
          </div>
          <div className="media__tags">
          </div>
          <Table className="media__file-list file-list" results={sortedList}/>
          <div className="media__popup">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <h2>Empty List</h2>
        </div>
      );
    }
  }

}

export default Media;

function sortResources (resources, sortList, attributes, extensions) {
  return sortList.reduce((sortedList, sortAttribute) => sortedList.sort(
    extensions.attributes
      .getExtensions()
      .find(extension => extension.getName() === attributes[sortAttribute.id].extensionName)
      .getSortFunction(sortAttribute.id, sortAttribute.order)
  ), resources);
}
