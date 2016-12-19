import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { addLabel } from "../../../../actions/labelList";
import SelectAttribute from "../../../../components/attributes/SelectAttribute.jsx";
import { saveMedia } from "../../../../actions/index";

@connect(state => ({
  fileList: state.fileList,
  labelList: state.labelList
}))
class Manage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {
        attributes: Object.assign({}, this.props.fileList[this.props.params.hashPath].attributes)
      },
      validation: {}
    };
    this.onCloseClick = this.onCloseClick.bind(this);
    this.handleAddAttribute = this.handleAddAttribute.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCloseClick() {
    this.props.dispatch(push("project/media/"));
  }

  handleAddAttribute(attributeHashPath) {
    this.setState({
      details: Object.assign({}, this.state.details, {
        attributes: Object.assign({}, this.state.details.attributes, { [attributeHashPath]: true })
      })
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.validation() === false) {
      return;
    }
    this.props.dispatch(saveMedia(this.props.params.hashPath, this.state.details));
    this.props.dispatch(push("project/media"));
  }

  validation() {
    let newValidation = {};
    let isValid = true;

    if(isValid === false) {
      this.setState({
        validation: newValidation
      });
    }
    return isValid;
  }

  render() {
    return (
      <div className="popup edit-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            { Object.keys(this.state.details.attributes)
                .map(labelKey => <div key={labelKey}><span className="badge">{this.props.labelList[labelKey].name}</span></div>)
            }
          </div>
          <div className="form-group">
            <label>Add Label</label>
            <SelectAttribute onChange={this.handleAddAttribute} />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
          <button type="button" className="btn btn-default" onClick={this.onCloseClick}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default Manage;
