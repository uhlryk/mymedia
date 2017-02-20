import React from 'react';
import ExtensionManager from "./ExtensionManager";

class RegisterExtensions extends React.Component {
  static propsTypes = {
    list: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.extensions = new ExtensionManager();
    Object.keys(this.props.list).forEach(elemName => {
      let extension = this.props.list[elemName];
      this.extensions.register(extension)
    });
  }

  getChildContext() {
    return {
      extensions: this.extensions
    }
  }

  render() {
    return this.props.children;
  }
}

export default RegisterExtensions;
