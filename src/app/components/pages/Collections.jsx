import React from 'react';
import ReactRedux from 'react-redux';
import * as RB from 'react-bootstrap';
import * as ActionTypes from '../../actionTypes';

class Collections extends React.Component {

  constructor(props) {
    super(props);
    this.onOpenDirectory = this.onOpenDirectory.bind(this);
  }

  onOpenDirectory() {
    this.props.dispatch({
      type: ActionTypes.GO_TO_MEDIA_PAGE
    });
  }

  render() {
    return (
      <div className="row">
        <RB.Jumbotron className="text-center">
          <p>Select Collection directory</p>
          <p>
            <RB.Button bsStyle="primary" onClick={this.onOpenDirectory} >Collection</RB.Button>
          </p>
        </RB.Jumbotron>
      </div>
    );
  }
}

function select(state) {
  return {
    page: state.page
  }
}

export default ReactRedux.connect(select)(Collections);
