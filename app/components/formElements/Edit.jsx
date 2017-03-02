import React from "react";

export default class Edit extends React.Component {
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
        {this.context.extensions.getFormElements().getExtension(this.props.type).getEdit(props)}
      </div>
    );
  }
}
