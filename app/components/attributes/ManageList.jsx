import React from "react";
import { connect } from "react-redux";

@connect(state => ({
  attributes: state.attributes
}))
class ManageList extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object
  };

  render() {
    const fields = Object.keys(this.props.attributes).map(id => {
      let attribute = this.props.attributes[id];
      return (
        <tr key={attribute.id}>
          <td>{attribute.displayName}</td>
          <td>{attribute.extensionName}</td>
          <td className="button-list">
            <button className="button button--secondary" onClick={() => {}}>Edit</button>
            <button className="button button--danger" onClick={() => {}}>Delete</button>
          </td>
        </tr>
      );
    });
    return (
      <div className="modal__body">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="col-md-6 col-sm-6">Name</th>
              <th className="col-md-3 col-sm-3">Type</th>
              <th className="col-md-3 col-sm-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fields}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManageList;
