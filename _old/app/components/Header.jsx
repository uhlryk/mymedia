import React from "react";
import classnames from "classnames";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    }
    this.onClickMenu = this.onClickMenu.bind(this);
  }

  onClickMenu () {
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }))
  }
  render() {
    const menuClassName = classnames("collapse navbar-collapse", {
      "show": this.state.showMenu
    });
    return (
      <nav className="project-header">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" onClick={this.onClickMenu}>
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <span className="navbar-brand" href="#">{this.props.branding}</span>
          </div>
          <div className={menuClassName} >
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
