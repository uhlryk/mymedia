import React from 'react';
import { connect } from "react-redux";
import ExtensionManager from "./ExtensionManager";

@connect(state => state)
class RegisterExtensions extends React.Component {
  static propsTypes = {
    list: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.extensions = new ExtensionManager(props);
    Object.keys(this.props.list).forEach(elemName => {
      let Extension = this.props.list[elemName];
      this.extensions.register(new Extension())
    });
  }

  getChildContext() {
    return {
      extensions: this.extensions
    }
  }

  componentWillUpdate(nextprops, nextstate) {
    this.extensions.onStoreChange(nextprops)
  }

  render() {
    return this.props.children;
  }
}

export default RegisterExtensions;
