import React from "react";
import uuid from "uuid-v4";
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
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onRecreateClick = this.onRecreateClick.bind(this);
  }

  onRecreateClick(fileId) {
    this.props.onChange(this.props.value
      .map(fileData => {
        if (fileData.id === fileId && fileData.status === FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE) {
          return Object.assign({}, fileData, {
            status: FileDropUploadAttributesExtension.fileStatus.UPLOADED
          });
        } else {
          return fileData
        }
      }));
  }

  onRemoveClick(fileId) {
    this.props.onChange(this.props.value
      .filter(fileData => {
        return !(fileData.id === fileId && fileData.status === FileDropUploadAttributesExtension.fileStatus.BEFORE_UPLOAD)
      })
      .map(fileData => {
        if (fileData.id === fileId && fileData.status === FileDropUploadAttributesExtension.fileStatus.UPLOADED) {
          return Object.assign({}, fileData, {
            status: FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE
          });
        } else {
          return fileData
        }
      }));
  }

  onChange(files) {
    const newValue = (this.props.value || []).concat(Array.from(files).map(file => ({
      id: uuid(),
      file,
      status: FileDropUploadAttributesExtension.fileStatus.BEFORE_UPLOAD
    })));
    this.props.onChange(newValue);
  }

  render() {
    const fileList = (this.props.value || []).map(fileData => {
      let button;
      if (fileData.status === FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE) {
        button = <button type="button" className="button button--warning" onClick={() => this.onRecreateClick(fileData.id)} >Recreate</button>;
      } else {
        button = <button type="button" className="button button--danger" onClick={() => this.onRemoveClick(fileData.id)} >Remove</button>;
      }
      return (
        <tr key={fileData.id}>
          <td>{fileData.name || fileData.file.name}</td>
          <td>{fileData.status}</td>
          <td>{button}</td>
        </tr>
      )
    });
    return (
      <div>
        <table className="table table-striped table-condensed table-hover">
          <tbody>
          {fileList}
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
