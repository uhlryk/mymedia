import React from "react";

function getComponent(extensions, componentName, props = {}) {
  let componentClass = extensions.getFormElementExtensions().find(extension => {
    return extension.getConfig().key === componentName
  });
  if(componentClass) {
    let component = React.createFactory(componentClass.getView());
    return component(props);
  } else {
    return <div></div>;
  }
}

export default class View extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    type: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object
  }
  render() {
    let value = this.props.value || (this.props.settings && this.props.settings.defaultValue);
    if(!value) return false;
    var props = Object.assign({}, this.props.settings, { value });
    return (
      <div className="file-list__element">
        <small>{this.props.name}</small>
        {getComponent(this.context.extensions, this.props.type, props)}
      </div>
    );
  }
}
