import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as RB from "react-bootstrap";
import FileSize from "./FileSize.jsx";
import DateDisplay from "./DateDisplay.jsx";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";
@connect(state => ({}))
class CustomRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      short: true,
      editTitle: false,
      editDescription: false
    }
    this.onToggleSize = this.onToggleSize.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  onToggleSize() {
    this.setState({
      short: !this.state.short
    })
  }
  onEditClick() {
    this.props.dispatch(push("project/media/edit-file/" + this.props.data.hashPath));
  }
  render() {
    let toogleSizeLabel = "More";
    let rowClassName = "list__row";
    if (!this.state.short) {
      toogleSizeLabel = "Less";
      rowClassName += " list__row--long";
    }
    let descriptionComponent = null;
    if (this.state.editDescription && this.props.data.description) {
      descriptionComponent = <textarea>{this.props.data.description}</textarea>;
    } else if (this.state.editDescription && !this.props.data.description) {
      descriptionComponent = <textarea></textarea>;
    } else if (!this.state.editDescription && this.props.data.description) {
      descriptionComponent = <div>{this.props.data.description}</div>
    } else if (!this.state.editDescription && !this.props.data.description) {
      descriptionComponent = <div><i>{DEFAULT_DESCRIPTION}</i></div>
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
            {descriptionComponent}
          </div>
          <div className="list__tags">
            <button className="list__button" onClick={this.onEditClick} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
          </div>
        </div>
        <div className="list__more">
          <div onClick={this.onToggleSize} >{toogleSizeLabel}</div>
        </div>
      </div>
    );
  }
}
export default CustomRow;
