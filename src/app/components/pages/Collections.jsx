import React from 'react';
import { connect } from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Actions from '../../actions/index.js';
var remote = require('remote');
var dialog = remote.require('dialog');

@connect(state => ({
  page: state.page
}))
class Collections extends React.Component {

  constructor(props) {
    super(props);
    this.onOpenDirectory = this.onOpenDirectory.bind(this);
  }

  onOpenDirectory() {
    dialog.showOpenDialog({
      properties: [ 'openDirectory']
    }, (fileNames) => {
      if(fileNames && fileNames.length > 0) {
        this.props.dispatch(Actions.Thunk.readCollection(fileNames[0]));
      }
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

export default Collections;
