import React from "react";
import View from "../attributes/View.jsx";
import { connect } from "react-redux";
@connect(state => ({
  fileList: state.fileList,
  attributes: state.attributes
}))
class ViewDetails extends React.Component {

  static propsTypes = {
    resourceId: React.PropTypes.string
  };

  render() {
    const resource = this.props.fileList[this.props.resourceId];
    const attributes = Object.keys(this.props.attributes).map(attributeId => {
      let attribute = this.props.attributes[attributeId];
      return (
        <View
          key={attributeId}
          value={resource[attributeId]}
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
