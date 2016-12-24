import React from "react";
import classNames from "classnames";

class ActionMenu extends React.Component {

  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.state = {
      menu: false
    };
  }

  static propsTypes = {
    elements: React.PropTypes.array
  };


  onToggle() {
    if(!this.state.menu) {

    }
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    const rows = [];
    for (var i=0; i < this.props.elements.length; i++) {
      let element = this.props.elements[i];
      rows.push(<div key={element.label} className="action-menu__element" onClick={element.onClick}>{element.label}</div>);
    }
    return (
      <div className="action-menu">
        <div className="action-menu__button" onClick={this.onToggle}><i className="fa fa-bars" aria-hidden="true"></i></div>
        <div className={classNames("action-menu__menu", {"action-menu__menu--open": this.state.menu})}>
          {rows}
        </div>
      </div>
    );
  }
}
export default ActionMenu;
