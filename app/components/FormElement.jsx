import React from "react";

import * as InputElement from "./formElements/Input.jsx";
import * as TextAreaElement from "./formElements/TextArea.jsx";
import * as RatingElement from "./formElements/Rating.jsx";

const components = {
  "input": InputElement,
  "textArea": TextAreaElement,
  "rating": RatingElement
};
function getComponent(mode, componentName, props = {}) {
  let componentClass = components[componentName];
  if(componentClass) {
    let component = React.createFactory(componentClass[mode]);
    return component(props);
  } else {
    return <div></div>;
  }
}

function getSettingsComponent(componentName, props = {}) {
  return getComponent("Settings", componentName, props);
}
function getFormElementComponent(componentName, props = {}) {
  return getComponent("FormElement", componentName, props);
}
function getViewComponent(componentName, props = {}) {
  return getComponent("View", componentName, props);
}
export class Settings extends React.Component {
  static propsTypes = {
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  render() {
    return (
      <div>
        {getSettingsComponent(this.props.type, {onChange: this.props.onChange})}
      </div>
    );
  }
}

export class FormElement extends React.Component {
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
        {getFormElementComponent(this.props.type, props)}
      </div>
    );
  }
}

export class View extends React.Component {
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
        {getViewComponent(this.props.type, props)}
      </div>
    );
  }
}
