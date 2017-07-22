import React from "react";
import ViewDetails from "./ViewDetails.jsx";
import ManageForm from "./ManageForm.jsx";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";

@connect(state => ({}))
class Table extends React.Component {

  static contextTypes = {
    extensions: React.PropTypes.object,
    modals: React.PropTypes.object
  };

  static propsTypes = {
    results: React.PropTypes.array,
    className: React.PropTypes.string
  };

  constructor(props) {
    super(props);
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

  onViewClick(resourceId) {
    this.context.modals.showModal("modal", {
      title: "View resource",
      body: {
        Component: ViewDetails,
        props: {
          resourceId
        }
      },
      buttons: [{
        className: "modal__button-action modal__button-action--secondary",
        label: "Manage",
        onClick: () => this.onManageClick()
      }]
    });
  }

  render() {
    const projectExtension = this.context.extensions.projects.getActive();
    const rows = [];
    const results = this.props.results.slice();
    results.sort(compare);
    for (let i=0; i < results.length; i++) {
      const data = results[i];
      rows.push(<div key={data.id} onClick={() => this.onViewClick(data.id)}>{projectExtension.getListing({ data: data })}</div>);
    }
    return (
      <div className={this.props.className} >
        {rows}
        <ReactTooltip place="top" type="info" effect="float" id="file-list" class="tooltip"/>
      </div>
    );
  }
}

export default Table;

function setComparisonValue(file) {
  if(file.isNew) return 10;
  if(!file.isChanged && file.isPresent) return 9;
  if(file.isPresent) return 8;
  if(!file.isPresent) return 7;
}

function compare(a, b) {
  const aValue = setComparisonValue(a);
  const bValue = setComparisonValue(b);
  if(aValue > bValue) return -1;
  if(aValue === bValue) return 0;
  if(aValue < bValue) return 1;
}
