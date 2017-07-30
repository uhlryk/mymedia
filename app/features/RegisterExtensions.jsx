import React from 'react';

class RegisterExtensions extends React.Component {
  static propsTypes = {
    list: React.PropTypes.object.isRequired,
    extensionManager: React.PropTypes.object.isRequired
  };

  static childContextTypes = {
    extensions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.extensions = props.extensionManager;
    if(this.props.list.attributes) {
      Object.keys(this.props.list.attributes).forEach(elemName => {
        let Extension = this.props.list.extensions[elemName].RendererAttributeExtension;
        this.extensions.attributes.registerExtension(new Extension())
      });
    }
    if(this.props.list.projects) {
      Object.keys(this.props.list.projects).forEach(elemName => {
        let Extension = this.props.list.projects[elemName].RendererProjectExtension;
        this.extensions.projects.registerExtension(new Extension())
      });
    }
  }

  getChildContext() {
    return {
      extensions: this.extensions
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return this.props.children;
  }
}

export default RegisterExtensions;
