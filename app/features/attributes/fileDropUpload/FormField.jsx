import React from "react";
import md5 from "md5";
import DropFile from "./DropFile";
import FileDropUploadAttributesExtension from "./index";

export default class FormField extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(files) {
    console.log(files);
    const newValue = (this.props.value || []).concat(Array.from(files).map(file => ({
      file,
      status: FileDropUploadAttributesExtension.fileStatus.BEFORE_UPLOAD
    })));
    this.props.onChange(newValue);
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-condensed table-hover">
          <tbody>
          {(this.props.value || []).map(fileData => (
            <tr key={fileData.id || md5(fileData.file.path)}>
              <td>{fileData.name || fileData.file.name}</td>
              <td>{fileData.status}</td>
              <td><button className="button button--danger">Remove</button></td>
            </tr>
          ))}
          </tbody>
        </table>
        <DropFile
          label={this.props.label}
          disabled={this.props.disabled}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
