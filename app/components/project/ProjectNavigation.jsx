import React from "react";
import { connect } from "react-redux";
import ManageList from "../attributes/ManageList.jsx";
import ManageCreate from "../attributes/ManageCreate.jsx";

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
      },
      buttons: [{
        className: "modal__button-action modal__button-action--secondary",
        label: "Create attribute",
        onClick: () => this.context.modals.showModal("formModal", {
          title: "Create attributes",
          body: {
            Component: ManageCreate,
            props: {}
          }
        })
      }]
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
