import React from "react";
import FileSize from "./FileSize.jsx";
import DateDisplay from "./DateDisplay.jsx";

class CustomRow extends React.Component {

  render() {

    return (
      <div className="list__row">
        <div className="list__name">{this.props.data.name}</div>
        <div className="list__original-path">{this.props.data.path}</div>
        <div className="list__size">
          <FileSize data={this.props.data.size} />
        </div>
        <div className="list__birthtime">
          <DateDisplay data={this.props.data.birthtime} />
        </div>
        <div className="list__description">
          <DateDisplay data={this.props.data.birthtime} />
        </div>
      </div>
    );
  }
}
export default CustomRow;
