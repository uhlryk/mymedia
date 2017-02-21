import React from "react";

function getComponent(extensions, mode, componentName, props = {}) {
  let componentClass = extensions.getFormElementExtensions().find(extension => {
    return extension.getConfig().key === componentName
  });
  if(componentClass) {
    let component = React.createFactory(componentClass[mode]);
    return component(props);
  } else {
    return <div></div>;
  }
}

function getSettingsComponent(extensions, componentName, props = {}) {
  return getComponent(extensions, "Settings", componentName, props);
}
function getFormElementComponent(extensions, componentName, props = {}) {
  return getComponent(extensions, "FormElement", componentName, props);
}
function getViewComponent(extensions, componentName, props = {}) {
  return getComponent(extensions, "View", componentName, props);
}

export class Settings extends React.Component {
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
        {getSettingsComponent(this.context.extensions, this.props.type, {onChange: this.props.onChange})}
      </div>
    );
  }
}

export class FormElement extends React.Component {
  static contextTypes = {
    extensions: React.PropTypes.object
  };

  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    settings: React.PropTypes.object
  };
  render() {
    let props = Object.assign({}, this.props.settings, { onChange: this.props.onChange, value: this.props.value });
    return (
      <div className="form__group">
        <label>{this.props.name}</label>
        {getFormElementComponent(this.context.extensions, this.props.type, props)}
      </div>
    );
  }
}

export class View extends React.Component {
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
        {getViewComponent(this.context.extensions, this.props.type, props)}
      </div>
    );
  }
}
