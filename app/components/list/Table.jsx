import React from "react";
import Row from "./Row.jsx";
import ReactTooltip from "react-tooltip";

class Table extends React.Component {

  static propsTypes = {
    results: React.PropTypes.array,
    className: React.PropTypes.string
  };

  render() {
    var rows = [];
    for (var i=0; i < this.props.results.length; i++) {
      rows.push(<Row data={this.props.results[i]} key={this.props.results[i].hashPath} />);
    }
    return (
      <div className={this.props.className} >
        {rows}
        <ReactTooltip place="top" type="info" effect="float" id="file-list" class="tooltip"/>
      </div>
    );
  }
}

export default Table;
