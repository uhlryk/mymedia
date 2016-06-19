import React from "react";
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.textOnClick = this.textOnClick.bind(this);
    this.filterText = this.filterText.bind(this);
  }
  textOnClick(evt) {
    evt.stopPropagation();
  }

  filterText(evt) {
    this.props.filterByColumn(evt.target.value, this.props.columnName)
  }

  render() {
    return (
      <div>
        <div><strong style={{color: this.props.color}}>{this.props.displayName}</strong></div>
        <input className="list__filter" type="text" onChange={this.filterText} onClick={this.textOnClick} />
      </div>
    );
  }
}
export default Filter;
