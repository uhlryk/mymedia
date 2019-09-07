import React from "react";
import moment from "moment";
class DateDisplay extends React.Component {
  render() {
    var date = moment(this.props.value).format("DD.MM.YYYY");
    return <span>{date}</span>;
  }
}
export default DateDisplay;