import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import View from "../formElements/View.jsx";
import { openFile } from "./../../actions/openFile";
import FileSize from "./FileSize.jsx";
import Tag from "../tags/Tag.jsx";
import DateDisplay from "./DateDisplay.jsx";
const DEFAULT_DESCRIPTION = "No description. Please edit and add new.";
@connect(state => ({
  formElement: state.formElement
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

    const className = classNames("file-list__row", {
      "file-list__row--long": !this.state.short,
      "file-list__row--new": this.props.data.isNew,
      "file-list__row--not-changed": !this.props.data.isNew && this.props.data.isPresent && !this.props.data.isChanged,
      "file-list__row--delete": !this.props.data.isPresent
    });
    return (
      <div className={className}>
        <div onDoubleClick={this.onOpenClick} className="file-list__name">{this.props.data.name}</div>
        <div onDoubleClick={this.onOpenClick}  className="file-list__original-path">{this.props.data.path}</div>
        <div className="file-list__additional">
          <div className="file-list__meta">
            <span className="file-list__meta-title">size: </span>
            <FileSize data={this.props.data.size} />
            <span className="file-list__meta-title"> created: </span>
            <DateDisplay data={this.props.data.birthtime} />
          </div>
          <div className="file-list__description">
            {descriptionComponent}
          </div>
          {Object.keys(this.props.formElement).map(elementId => {
            let element = this.props.formElement[elementId];
            return (
              <View
                key={elementId}
                value={this.props.data[elementId]}
                name={element.name} type={element.type}
                settings={element.settings}
              />
            )
          })}
          <div className="file-list__tags">
            { this.props.data.tags
              .map(tagName => <Tag tooltip="file-list" key={tagName} className="tag--inline" name={tagName} />)
              }
          </div>
        </div>
        <div className="file-list__actions">
          <div className="file-list__more" onClick={this.onToggleSize} >{toogleSizeLabel}</div>
          <div className="file-list__open" onClick={this.onOpenClick}><i className="fa fa-eye" aria-hidden="true"></i> play</div>
          <div className="file-list__manage" onClick={this.onManageClick} ><i className="fa fa-address-card-o" aria-hidden="true"></i> manage</div>
        </div>
      </div>
    );
  }
}
export default CustomRow;