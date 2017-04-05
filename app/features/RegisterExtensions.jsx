import React from 'react';
import { connect } from "react-redux";
import StoreExtensionManager from "./StoreExtensionManager";

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
    this.extensions = new StoreExtensionManager(props);
    if(this.props.list.extensions) {
      Object.keys(this.props.list.extensions).forEach(elemName => {
        let Extension = this.props.list.extensions[elemName];
        this.extensions.registerExtension(new Extension())
      });
    }
    if(this.props.list.projects) {
      Object.keys(this.props.list.projects).forEach(elemName => {
        let Extension = this.props.list.projects[elemName];
        this.extensions.projects.registerExtension(new Extension())
      });
    }
  }

  getChildContext() {
    return {
      extensions: this.extensions
    }
  }

  componentWillUpdate(nextprops, nextstate) {
    console.log("A0");
    console.log(this.extensions);
    this.extensions.callEvent("STORE_CHANGE", nextprops)
  }

  render() {
    return this.props.children;
  }
}

export default RegisterExtensions;
