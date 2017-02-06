import React from "react";

import * as InputElement from "./formElements/InputElement.jsx";

const components = {
  "input": InputElement
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

export class Settings extends React.Component {
  static propsTypes = {
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  render() {
    return (
      <div>
        {getComponent("Settings", this.props.type, {onChange: this.props.onChange})}
      </div>
    );
  }
}

export class FormElement extends React.Component {
  static propsTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object
  };
  render() {
    return (
      <div className="form__group">
        <label>{this.props.name}</label>
        {getComponent("FormElement", this.props.type, this.props.settings)}
      </div>
    );
  }
}
