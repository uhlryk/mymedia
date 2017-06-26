import React from "react";
import Row from "./Row.jsx";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

@connect(state => ({}))
class Table extends React.Component {

  static propsTypes = {
    results: React.PropTypes.array,
    className: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const rows = [];
    const results = this.props.results.slice();
    results.sort(compare);
    for (let i=0; i < results.length; i++) {
      const data = results[i];
      rows.push(<Row data={data} key={data.hashPath} />);
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

function setComparisonValue(file) {
  if(file.isNew) return 10;
  if(!file.isChanged && file.isPresent) return 9;
  if(file.isPresent) return 8;
  if(!file.isPresent) return 7;
}

function compare(a, b) {
  const aValue = setComparisonValue(a);
  const bValue = setComparisonValue(b);
  if(aValue > bValue) return -1;
  if(aValue === bValue) return 0;
  if(aValue < bValue) return 1;
}
