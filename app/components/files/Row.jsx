import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import classNames from "classnames";
import View from "../attributes/View.jsx";
import { openFile } from "./../../actions/openFile";
import Tag from "../../features/attributes/tag/Tag.jsx";
@connect(state => ({
  attributes: state.attributes
}))
class CustomRow extends React.Component {

  static propsTypes = {
    data: React.PropTypes.object
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
    this.setState((prevState, props) => ({
      short: !prevState.short
    }));
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
        {Object.keys(this.props.attributes).map(attributeId => {
          let attribute = this.props.attributes[attributeId];
          if(!attribute.alwaysVisible) {
            return false;
          }
          return (
            <View
              key={attributeId}
              value={this.props.data[attributeId]}
              attribute={attribute}
            />
          )
        })}
        <div className="file-list__additional">
          {Object.keys(this.props.attributes).map(attributeId => {
            let attribute = this.props.attributes[attributeId];
            if(attribute.alwaysVisible === true) {
              return false;
            }
            return (
              <View
                key={attributeId}
                value={this.props.data[attributeId]}
                attribute={attribute}
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
