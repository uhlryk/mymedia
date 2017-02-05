import React from "react";

import * as InputElement from "./formElements/InputElement.jsx";

const components = {
  "input": InputElement
};
function getComponent(componentName, props = {}) {
  let componentClass = components[componentName];
  if(componentClass) {
    let component = React.createFactory(componentClass.Settings);
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
        {getComponent(this.props.type, {onChange: this.props.onChange})}
      </div>
    );
  }
}
