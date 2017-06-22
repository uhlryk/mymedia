import React from "react";
import { connect } from "react-redux";
import ManageForm from "./ManageForm.jsx";
import classNames from "classnames";
import View from "../attributes/View.jsx";
import ViewDetails from "./ViewDetails.jsx";
import { openFile } from "./../../actions/openFile";
@connect(state => ({
  attributes: state.attributes
}))
class CustomRow extends React.Component {

  static propsTypes = {
    data: React.PropTypes.object
  };

  static contextTypes = {
    modals: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.onManageClick = this.onManageClick.bind(this);
  }

  onOpenClick() {
    this.props.dispatch(openFile(this.props.data.path));
  }
  onManageClick() {
    this.context.modals.showModal("formModal", {
      title: "Edit resource",
      body: {
        Component: ManageForm,
        props: {
          data: this.props.data,
          mode: ManageForm.EDIT,
        }
      }
    });
  }
  onViewClick(attributes, data) {
    this.context.modals.showModal("modal", {
      title: "View resource",
      body: {
        Component: ViewDetails,
        props: {
          data,
          attributes
        }
      },
      buttons: [{
        className: "modal__button-action",
        label: "Open",
        onClick: () => this.onOpenClick()
      }, {
        className: "modal__button-action modal__button-action--secondary",
        label: "Manage",
        onClick: () => this.onManageClick()
      }]
    });
  }
  render() {
    const className = classNames("file-list__row", {
      "file-list__row--new": this.props.data.isNew,
      "file-list__row--not-changed": !this.props.data.isNew && this.props.data.isPresent && !this.props.data.isChanged,
      "file-list__row--delete": !this.props.data.isPresent
    });
    return (
      <div className={className} onClick={this.onViewClick.bind(this, this.props.attributes, this.props.data)}>
        {Object.keys(this.props.attributes).map(attributeId => {
          let attribute = this.props.attributes[attributeId];
          if(!attribute.view.listing) {
            return false;
          }
          return (
            <View
              key={attributeId}
              value={this.props.data[attributeId]}
              attribute={attribute}
            />
          )
        })}
      </div>
    );
  }
}
export default CustomRow;
