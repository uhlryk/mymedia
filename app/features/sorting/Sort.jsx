import React from "react";
import { connect } from "react-redux";
import { addSort } from "../../actions/sort";

@connect(state => ({
  attributes: state.attributes,
  sort: state.sort
}))
class Sort extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  handleAttributeChange(evt) {
    const value = evt.target.value;
    this.props.dispatch(addSort(value));
  }


  render() {
    const id = this.props.sort[0] && this.props.sort[0].id;
    return (
      <select  value={id} onChange={this.handleAttributeChange}  className="form__element">
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
