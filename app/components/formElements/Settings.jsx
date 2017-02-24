import React from "react";

function getComponent(extensions, componentName, props = {}) {
  let componentClass = extensions.getFormElementExtensions().find(extension => {
    return extension.getConfig().key === componentName
  });
  if(componentClass) {
    let component = React.createFactory(componentClass.getSettings());
    return component(props);
  } else {
    return <div></div>;
  }
}

export default class Settings extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  render() {
    return (
      <div>
        {getComponent(this.context.extensions, this.props.type, {onChange: this.props.onChange})}
      </div>
    );
  }
}
