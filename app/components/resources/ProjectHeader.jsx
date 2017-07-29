import React from "react";
import { connect } from "react-redux";
import ManageList from "../attributes/ManageList.jsx";
import ManageCreate from "../attributes/ManageCreate.jsx";
import classNames from "classnames";
import { push } from "react-router-redux";
import ManageForm from "./ManageForm.jsx";
import Header from "../Header.jsx";

class ProjectHeader extends React.Component {

  constructor(props) {
    super(props);
    this.onManageClick = this.onManageClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onAddNewClick = this.onAddNewClick.bind(this);
    this.state = {
      showMenu: false
    }
  }

  static contextTypes = {
    modals: React.PropTypes.object
  };

  onMenuClick() {
    this.setState((prevState, props) => ({
      showMenu: !prevState.showMenu
    }));
  }

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

  onAddNewClick() {
    this.context.modals.showModal("formModal", {
      title: "Create resource",
      body: {
        Component: ManageForm,
        props: {
          data: {},
          mode: ManageForm.CREATE,
        }
      }
    });
  }

  render() {
    const menuClassName = classNames("project-header__menu", {
      "project-header__menu--open": this.state.showMenu
    });
    const branding = (
      <span>
        <a href="#" onClick={() => this.props.dispatch(push("/"))}>Projects</a> / {this.props.project.name}
      </span>
    );
    return (
      <Header branding={branding}>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={ this.onAddNewClick }>Create resource</a></li>
          <li className={menuClassName}>
            <a href="#" className="dropdown-toggle" onClick={this.onMenuClick} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Project details</a></li>
              <li><a href="#" onClick={this.onManageClick}>Attributes</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#" onClick={() => this.props.dispatch(push("/"))}>Project List</a></li>
            </ul>
          </li>
        </ul>
      </Header>
    );
  }
}
export default connect(state => ({
  project: state.project
}))(ProjectHeader);
export {
  ProjectHeader
}
