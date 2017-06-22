import React from "react";
import View from "../attributes/View.jsx";
class ViewDetails extends React.Component {

  static propsTypes = {
    data: React.PropTypes.object,
    attributes: React.PropTypes.object
  };

  render() {
    const attributes = Object.keys(this.props.attributes).map(attributeId => {
      let attribute = this.props.attributes[attributeId];
      return (
        <View
          key={attributeId}
          value={this.props.data[attributeId]}
          attribute={attribute}
        />
      )
    });
    return (
      <div className="modal__body">
        {attributes}
      </div>
    );
  }
}
export default ViewDetails;
