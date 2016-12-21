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
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    const rows = [];
    for (var i=0; i < this.props.elements.length; i++) {
      let element = this.props.elements[i];
      if(element.component) {
        rows.push(element.component);
      } else {
        rows.push(<div className="actionMenu__element" onClick={element.onClick}>{element.label}</div>);
      }
    }
    return (
      <div className="actionMenu">
        <div className="actionMenu__button" onClick={this.onToggle}><i className="fa fa-bars" aria-hidden="true"></i></div>
        <div className={classNames("actionMenu__menu", {"actionMenu__menu--open": this.state.menu})}>
          {rows}
        </div>
      </div>
    );
  }
}
export default ActionMenu;
