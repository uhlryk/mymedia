import React from "react";
import { connect } from "react-redux";

import Table from "../../components/list/Table.jsx";
import AttributeList from "../../components/attributes/AttributeList.jsx";

@connect(state => ({
  fileList: state.fileList
}))
class Media extends React.Component {

  render() {
    let list = Object.keys(this.props.fileList).map(filePath => {
      return this.props.fileList[filePath];
    });
    if(list.length) {
      return (
        <div className="media">
          <div className="media__attributes">
            <AttributeList />
          </div>
          <Table className="media__list list" results={list} />
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
