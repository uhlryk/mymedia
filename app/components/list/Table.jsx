import React from "react";
import Row from "./Row.jsx";
import ReactTooltip from "react-tooltip";

class Table extends React.Component {

  static propsTypes = {
    results: React.PropTypes.array,
    filters: React.PropTypes.shape({
      tags: React.PropTypes.array
    }),
    className: React.PropTypes.string
  };

  render() {
    console.log(this.props.results);
    var rows = [];
    for (var i=0; i < this.props.results.length; i++) {
      let data = this.props.results[i];
      let tags = data.tags;
      if(this.props.filters.tags.length === 0 || this.props.filters.tags.length === this.props.filters.tags.filter(tagName => data.tags.indexOf(tagName) !== -1).length) {
        rows.push(<Row data={data} key={data.hashPath} />);
      }
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
