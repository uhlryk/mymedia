import React from "react";
import * as RB from "react-bootstrap";
import Griddle from "griddle-react";
import { connect } from "react-redux";
import Filter from "../../../components/grid/Filter.jsx";

@connect(state => ({
  fileList: state.fileList
}))
class List extends React.Component {

  render() {
    console.log(this.props.fileList);
    let list = Object.keys(this.props.fileList).map(filePath => {
      return this.props.fileList[filePath];
    });
    console.log(list);
    if(list.length) {
      return (
        <div className="list">
          <Griddle
            useGriddleStyles={false}
            tableClassName="list__table"
            results={list}
            showFilter={false}
            showSettings={false}
            columnMetadata={[{
              columnName: "exist",
              displayName: "",
              customComponent: (props) => <span> {props.data?"exist" : "deleted"}</span>
            }, {
              columnName: "path",
              displayName: "path",
              customHeaderComponent: Filter
            }, {
              columnName: "size",
              displayName: "size",
              customHeaderComponent: Filter
            }]}
            columns={["exist", "path", "size"]}
          />
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

export default List;
