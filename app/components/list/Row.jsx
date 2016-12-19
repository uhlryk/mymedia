import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import FileSize from "./FileSize.jsx";
import OpenFile from "./OpenFile.jsx";
import DateDisplay from "./DateDisplay.jsx";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";
@connect(state => ({}))
class CustomRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      short: true
    }
    this.onToggleSize = this.onToggleSize.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onAttributeClick = this.onAttributeClick.bind(this);
  }

  onToggleSize() {
    this.setState({
      short: !this.state.short
    })
  }
  onEditClick() {
    this.props.dispatch(push("project/media/edit-file/" + this.props.data.hashPath));
  }
  onAttributeClick() {
    this.props.dispatch(push("project/media/attribute/manage/" + this.props.data.hashPath));
  }
  render() {
    let toogleSizeLabel = this.state.short ? "More" : "Less";
    let descriptionComponent = this.props.data.description || <i>{DEFAULT_DESCRIPTION}</i>;


    return (
      <div className={classNames("list__row", {"list__row--long": !this.state.short})}>
        <div className="list__name">{this.props.data.name}</div>
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
            <OpenFile hashPath={this.props.data.hashPath} />
            <button className="list__button" onClick={this.onEditClick} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button className="list__button" onClick={this.onAttributeClick} ><i className="fa fa-address-card-o" aria-hidden="true"></i></button>
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
