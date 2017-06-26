import React from "react";
import { connect } from "react-redux";
import ManageList from "../attributes/ManageList.jsx";
import ManageCreate from "../attributes/ManageCreate.jsx";
import classNames from "classnames";
import { push } from "react-router-redux";

@connect(state => ({
  project: state.project
}))
class ProjectHeader extends React.Component {

  constructor(props) {
    super(props);
    this.onManageClick = this.onManageClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
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

  render() {
    const menuClassName = classNames("project-header__menu", {
      "project-header__menu--open": this.state.showMenu
    });

    return (
      <nav className="project-header">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{this.props.project.name}</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li className={menuClassName}>
                <a href="#" className="dropdown-toggle" onClick={this.onMenuClick} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Project details</a></li>
                  <li><a href="#" onClick={this.onManageClick}>Attributes</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#" onClick={() => this.props.dispatch(push("project/menu"))}>Project List</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default ProjectHeader;
