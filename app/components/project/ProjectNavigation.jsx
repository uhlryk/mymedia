import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import ManageList from "../attributes/ManageList.jsx";

@connect(state => ({
  project: state.project
}))
class ProjectNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.onManageClick = this.onManageClick.bind(this);
  }

  static contextTypes = {
    modals: React.PropTypes.object
  };

  onManageClick() {
    this.context.modals.showModal("modal", {
      title: "Manage attributes",
      body: {
        Component: ManageList,
        props: {
          data: this.props.data
        }
      }
    });
  }

  render() {

    return (
      <div>
        <div>
          <strong>{this.props.project.name}</strong>
          {this.props.project.path}
        </div>
        <div>
          <button className="button" onClick={this.onManageClick}>attributes</button>
        </div>
      </div>
    );
  }
}
export default ProjectNavigation;
