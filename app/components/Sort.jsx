import React from "react";
import { connect } from "react-redux";
@connect(state => ({
  attributes: state.attributes
}))
class Sort extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  render() {
    return (
      <select className="form__element">
        <option value="">select type</option>
        {
          Object.keys(this.props.attributes)
            .map(attributeId => this.props.attributes[attributeId])
            .filter(attribute => !attribute.disableSort)
            .map(attribute => (
              <option key={attribute.id} value={attribute.id}>{attribute.displayName}</option>
            ))
        }
      </select>
    );
  }
}

export default Sort;
