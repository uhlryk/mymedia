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
          <td></td>
        </tr>
      );
    });
    return (
      <div className="modal__body">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="col-md-6 col-sm-6">Name</th>
              <th className="col-md-2 col-sm-2">Type</th>
              <th className="col-md-4 col-sm-4">Actions</th>
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
