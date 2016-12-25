import React from "react";
import Row from "./Row.jsx";

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
    return <div className={this.props.className} >{rows}</div>;
  }
}

export default Table;
