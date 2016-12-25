import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import { openFile } from "./../../actions/openFile";
import FileSize from "./FileSize.jsx";
import DateDisplay from "./DateDisplay.jsx";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";
@connect(state => ({ }))
class CustomRow extends React.Component {

  static propsTypes = {
    data: React.PropTypes.Object
  };

  constructor(props) {
    super(props);
    this.state = {
      short: true
    };
    this.onToggleSize = this.onToggleSize.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onManageTagClick = this.onManageTagClick.bind(this);
  }

  onToggleSize() {
    this.setState({
      short: !this.state.short
    })
  }
  onOpenClick() {
    this.props.dispatch(openFile(this.props.data.path));
  }
  onEditClick() {
    this.props.dispatch(push("project/media/edit/" + this.props.data.hashPath));
  }
  onManageTagClick() {
    this.props.dispatch(push("project/media/tag/manage/" + this.props.data.hashPath));
  }
  render() {
    let toogleSizeLabel = this.state.short ? "More" : "Less";
    let descriptionComponent = this.props.data.description || <i>{DEFAULT_DESCRIPTION}</i>;


    return (
      <div className={classNames("list__row", {"list__row--long": !this.state.short})}>
        <div className="list__name">{this.props.data.name}</div>
        <div className="list__original-path">{this.props.data.path}</div>
        <div className="list__additional">
          <div className="list__meta">
            <span className="list__meta-title">size: </span>
            <FileSize data={this.props.data.size} />
            <span className="list__meta-title"> created: </span>
            <DateDisplay data={this.props.data.birthtime} />
          </div>
          <div className="list__description">
            {descriptionComponent}
          </div>
          <div className="list__tags">
            <button className="list__button" onClick={this.onOpenClick}><i className="fa fa-eye" aria-hidden="true"></i></button>
            <button className="list__button" onClick={this.onEditClick} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button className="list__button" onClick={this.onManageTagClick} ><i className="fa fa-address-card-o" aria-hidden="true"></i></button>
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
