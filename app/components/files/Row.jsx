import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import View from "../formElements/View.jsx";
import { openFile } from "./../../actions/openFile";
import Tag from "../tags/Tag.jsx";
import DateDisplay from "./DateDisplay.jsx";
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

    const className = classNames("file-list__row", {
      "file-list__row--long": !this.state.short,
      "file-list__row--new": this.props.data.isNew,
      "file-list__row--not-changed": !this.props.data.isNew && this.props.data.isPresent && !this.props.data.isChanged,
      "file-list__row--delete": !this.props.data.isPresent
    });
    return (
      <div className={className}>
        {Object.keys(this.props.formElement).map(elementId => {
          let element = this.props.formElement[elementId];
          if(!element.settings.alwaysVisible) {
            return false;
          }
          return (
            <View
              key={elementId}
              value={this.props.data[elementId]}
              name={element.name} type={element.type}
              settings={element.settings}
            />
          )
        })}
        <div className="file-list__additional">
          <div className="file-list__meta">
            <span className="file-list__meta-title"> created: </span>
            <DateDisplay data={this.props.data.birthtime} />
          </div>
          {Object.keys(this.props.formElement).map(elementId => {
            let element = this.props.formElement[elementId];
            if(element.settings.alwaysVisible === true) {
              return false;
            }
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
