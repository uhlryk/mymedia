import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import View from "../../../components/attributes/View";
@connect(state => ({
  attributes: state.attributes
}))
class Listing extends React.Component {

  static propsTypes = {
    data: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const className = classNames("file-list__row", {
      "file-list__row--new": this.props.data.isNew,
      "file-list__row--not-changed": !this.props.data.isNew && this.props.data.isPresent && !this.props.data.isChanged,
      "file-list__row--delete": !this.props.data.isPresent
    });
    return (
      <div className={className}>
        {Object.keys(this.props.attributes).map(attributeId => {
          let attribute = this.props.attributes[attributeId];
          if(!attribute.view.listing) {
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
      </div>
    );
  }
}
export default Listing;
