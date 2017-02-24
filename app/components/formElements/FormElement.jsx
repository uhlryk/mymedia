import React from "react";

function getComponent(extensions, componentName, props = {}) {
  let componentClass = extensions.getFormElementExtensions().find(extension => {
    return extension.getConfig().key === componentName
  });
  if(componentClass) {
    let component = React.createFactory(componentClass.getFormElement());
    return component(props);
  } else {
    return <div></div>;
  }
}

export default class FormElement extends React.Component {
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
        {getComponent(this.context.extensions, this.props.type, props)}
      </div>
    );
  }
}

