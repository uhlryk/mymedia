import React from "react";
import uuid from "uuid-v4";
import DropFile from "./DropFile";
import FileDropUploadAttributesExtension from "./index.renderer";

export default class FormField extends React.Component {
  static propsTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    singleFile: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onRecreateClick = this.onRecreateClick.bind(this);
  }

  onRecreateClick(fileId) {
    if (this.props.singleFile) {
      let newValue = [];
      for (const fileData of this.props.value) {
        if(fileData.id === fileId) {
          newValue.push(Object.assign({}, fileData, {
            status: FileDropUploadAttributesExtension.fileStatus.UPLOADED
          }));
        } else if (fileData.status === FileDropUploadAttributesExtension.fileStatus.BEFORE_UPLOAD) {
          //do nothing, it will be removed
        } else {
          newValue.push(Object.assign({}, fileData, {
            status: FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE
          }));
        }
      }
      this.props.onChange(newValue);
    } else {
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
    let previousValue = this.props.value || [];
    if (this.props.singleFile) {
      let newValue = [];
      for (const fileData of previousValue) {
        if ([
          FileDropUploadAttributesExtension.fileStatus.UPLOADED,
          FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE
        ].includes(fileData.status)) {
          newValue.push(Object.assign({}, fileData, {
            status: FileDropUploadAttributesExtension.fileStatus.BEFORE_DELETE
          }));
        }
      }
      this.props.onChange(newValue.concat({
        id: uuid(),
        file: files[0],
        status: FileDropUploadAttributesExtension.fileStatus.BEFORE_UPLOAD
      }));
    } else {
      this.props.onChange(previousValue.concat(Array.from(files).map(file => ({
        id: uuid(),
        file,
        status: FileDropUploadAttributesExtension.fileStatus.BEFORE_UPLOAD
      }))));
    }
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
