import React from "react";
import classNames from "classnames";
import FileSize from "./FileSize.jsx";
import DateDisplay from "./DateDisplay.jsx";
import ActionMenu from "./ActionMenu.jsx";
import FileActionMenu from "./FileActionMenu.jsx";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";

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
    return (
      <div className={classNames("list__row", {"list__row--long": !this.state.short})}>
        <div className="list__title">
          <div className="list__name">{this.props.file.name}</div>
          <div className="list__menu"><FileActionMenu hashPath={this.props.file.hashPath}/></div>
        </div>
        <div className="list__original-path">{this.props.file.path}</div>
        <div className="list__additional">
          <div className="list__metadata">
            <span>created: </span>
            <DateDisplay data={this.props.file.birthtime} />
            <span className="list__metadata-size-label">size: </span>
            <FileSize data={this.props.file.size} />
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
