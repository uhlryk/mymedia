import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import FileSize from "./FileSize.jsx";
import OpenFile from "./OpenFile.jsx";
import DateDisplay from "./DateDisplay.jsx";
import ActionMenu from "./ActionMenu.jsx";
import { ipcRenderer } from "electron";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";
@connect(state => ({}))
class CustomRow extends React.Component {

  static propsTypes = {
    file: React.PropTypes.object
  };

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
    let toogleSizeLabel = this.state.short ? "More" : "Less";
    let descriptionComponent = this.props.file.description || <i>{DEFAULT_DESCRIPTION}</i>;
    const menuElements = [{
      component: <OpenFile className="actionMenu__element" hashPath={this.props.file.hashPath} />,
    }, {
      label: "edit",
      onClick: () => this.props.dispatch(push("project/media/edit/" + this.props.file.hashPath))
    }, {
      label: "tags",
      onClick: () => this.props.dispatch(push("project/media/tag/manage/" + this.props.file.hashPath))
    }];
    return (
      <div className={classNames("list__row", {"list__row--long": !this.state.short})}>
        <div className="list__title">
          <div className="list__name">{this.props.file.name}</div>
          <div className="list__menu"><ActionMenu elements={menuElements}/></div>
        </div>
        <div className="list__original-path">{this.props.file.path}</div>
        <div className="list__additional">
          <div className="list__size">
            <FileSize data={this.props.file.size} />
          </div>
          <div className="list__birthtime">
            <DateDisplay data={this.props.file.birthtime} />
          </div>
          <div className="list__description">
            {descriptionComponent}
          </div>
          <div className="list__tags">
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
