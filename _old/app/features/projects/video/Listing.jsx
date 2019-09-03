import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import View from "../../../components/attributes/View";

class Listing extends React.Component {

  static propsTypes = {
    data: React.PropTypes.object
  };

  render() {
    const className = classNames("listing");
    return (
      <div className={className}>
        {this.createViewAttribute("avatar-image-id", "listing__avatar")}
        {this.createViewAttribute("name-id", "listing__name")}
      </div>
    );
  }

  createViewAttribute (attributeId, className) {
    const attributes = this.props.attributes;
    const attribute = Object.assign({}, attributes[attributeId], { view: Object.assign({}, attributes[attributeId].view, {hidden: false})});
    const value = this.props.data[attributeId];
    return (
      <div className={className || ""}>
        <View
          key={attributeId}
          value={value}
          attribute={attribute}
        />
      </div>
    );
  }
}

export default connect(state => ({
  attributes: state.attributes
}))(Listing);
export {
  Listing
}

