import React from "react";
import { connect } from "react-redux";
import { addSort } from "../../actions/sort";

@connect(state => ({
  attributes: state.attributes,
  sort: state.sort
}))
class Sort extends React.Component {

  constructor(props) {
    super(props);
    this.handleAttributeChange = this.handleAttributeChange.bind(this);
  }

  handleAttributeChange(evt) {
    const value = evt.target.value;
    this.props.dispatch(addSort(value));
  }


  render() {

    return (
      <div>
        <table className="table table-striped table-condensed table-hover">
          <tbody>
          {this.props.sort.map(sortObj => (
            <tr key={sortObj.id}>
              <td>{sortObj.order}</td>
              <td>{this.props.attributes[sortObj.id].displayName}</td>
              <td><i className="fa fa-times" aria-hidden="true"></i></td>
            </tr>
          ))}
          </tbody>
        </table>
        <select  value={0} onChange={this.handleAttributeChange}  className="form__element">
          <option value="">select type</option>
          {
            Object.keys(this.props.attributes)
              .map(attributeId => this.props.attributes[attributeId])
              .filter(attribute => !attribute.disableSort && !this.props.sort.find(sortObj => attribute.id === sortObj.id))
              .map(attribute => (
                <option key={attribute.id} value={attribute.id}>{attribute.displayName}</option>
              ))
          }
        </select>
      </div>
    );
  }
}

export default Sort;
