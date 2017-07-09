import React from "react";
class Header extends React.Component {
  render() {
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
            <span className="navbar-brand" href="#">{this.props.branding}</span>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {this.props.children}
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
