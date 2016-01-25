import React from 'react';
import ReactRedux from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Pages from '../pages';
import * as ActionTypes from '../actionTypes';

class TopMenu extends React.Component {

  constructor(props) {
    super(props);
    this.onCollection = this.onCollection.bind(this);
  }

  onCollection() {
    this.props.dispatch({
      type: ActionTypes.GO_TO_COLLECTION_PAGE
    });
  }

  render() {
    return (
      <RB.Navbar>
        <RB.Navbar.Header>
          <RB.Navbar.Brand>Mymedia</RB.Navbar.Brand>
          <RB.Navbar.Toggle />
        </RB.Navbar.Header>
        <RB.Navbar.Collapse>
          <RB.Nav>
            <RB.NavItem eventKey={1} onClick={this.onCollection}>Collections</RB.NavItem>
          </RB.Nav>
        </RB.Navbar.Collapse>
      </RB.Navbar>
    );
  }
}

function select(state) {
  return {
    page: state.page
  }
}

export default ReactRedux.connect(select)(TopMenu);
