import React from "react";
import * as RB from "react-bootstrap";
import Griddle from "griddle-react";
import { connect } from "react-redux";

import CustomRow from "../../components/grid/CustomRow.jsx";
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
          <div className="media__list list">
            <Griddle
              results={list}
              resultsPerPage={20}
              showFilter={false}
              showSettings={false}
              useCustomRowComponent={true}
              customRowComponent={CustomRow}
            />
          </div>
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
