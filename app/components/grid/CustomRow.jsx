import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as RB from "react-bootstrap";
import FileSize from "./FileSize.jsx";
import DateDisplay from "./DateDisplay.jsx";

@connect(state => ({
}))
class CustomRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      short: true
    }
    this.onToggleSize = this.onToggleSize.bind(this);
  }

  onToggleSize() {
    this.setState({
      short: !this.state.short
    })
  }

  render() {
    let toogleSizeLabel = "More";
    let rowClassName = "list__row";
    if (!this.state.short) {
      toogleSizeLabel = "Less";
      rowClassName += " list__row--long";
    }
    return (
      <div className={rowClassName}>
        <div className="list__name" onClick={this.onStartEditClick}>{this.props.data.name}</div>
        <div className="list__original-path">{this.props.data.path}</div>
        <div className="list__additional">
          <div className="list__size">
            <FileSize data={this.props.data.size} />
          </div>
          <div className="list__birthtime">
            <DateDisplay data={this.props.data.birthtime} />
          </div>
          <div className="list__description">
            <DateDisplay data={this.props.data.description} />
          </div>
        </div>
        <div className="list__actions">
          <p bsStyle="primary" onClick={this.onToggleSize} >{toogleSizeLabel}</p>
        </div>
      </div>
    );
  }
}
export default CustomRow;
