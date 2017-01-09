import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import { openFile } from "./../../actions/openFile";
import FileSize from "./FileSize.jsx";
import Tag from "../tags/Tag.jsx";
import DateDisplay from "./DateDisplay.jsx";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";
@connect(state => ({
  tagList: state.tagList
}))
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
    this.onManageClick = this.onManageClick.bind(this);
  }

  onToggleSize() {
    this.setState({
      short: !this.state.short
    })
  }
  onOpenClick() {
    this.props.dispatch(openFile(this.props.data.path));
  }
  onManageClick() {
    this.props.dispatch(push("project/media/manage/" + this.props.data.hashPath));
  }
  render() {
    const moreComponent = <span>&#9658; More</span>;
    const lessComponent = <span>&#9660; Less</span>;
    let toogleSizeLabel = this.state.short ? moreComponent : lessComponent;
    let descriptionComponent = this.props.data.description || <i>{DEFAULT_DESCRIPTION}</i>;


    return (
      <div className={classNames("list__row", {"list__row--long": !this.state.short})}>
        <div onDoubleClick={this.onOpenClick} className="list__name">{this.props.data.name}</div>
        <div onDoubleClick={this.onOpenClick}  className="list__original-path">{this.props.data.path}</div>
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
            { Object.keys(this.props.data.tags)
              .map(tagKey => <Tag key={tagKey} className="tag--inline">{this.props.tagList[tagKey].name}</Tag>)
              }
          </div>
        </div>
        <div className="list__actions">
          <div className="list__more" onClick={this.onToggleSize} >{toogleSizeLabel}</div>
          <div className="list__open" onClick={this.onOpenClick}><i className="fa fa-eye" aria-hidden="true"></i> play</div>
          <div className="list__manage" onClick={this.onManageClick} ><i className="fa fa-address-card-o" aria-hidden="true"></i> manage</div>
        </div>
      </div>
    );
  }
}
export default CustomRow;
