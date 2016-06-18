import React from "react";
import { connect } from "react-redux";
import * as RB from "react-bootstrap";
import * as Actions from "../../actions/index.js";
var remote = require("remote");
var dialog = remote.require("dialog");

@connect(state => ({
}))
class SelectDirectory extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onCollectionPath = this.onCollectionPath.bind(this);
  }

  onCollectionPath() {
    dialog.showOpenDialog({
      properties: [ "openDirectory"]
    }, (fileNames) => {
      if(fileNames && fileNames.length > 0) {
        this.props.dispatch(Actions.Thunk.startCollection(this.context.router, fileNames[0]));
      }
    });

  }

  render() {
    return (
      <div className="row">
        <RB.Jumbotron className="text-center">
          <p>Select Collection directory</p>
          <p>
            <RB.Button bsStyle="primary" onClick={this.onCollectionPath} >Select Media Directory</RB.Button>
          </p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default SelectDirectory;
