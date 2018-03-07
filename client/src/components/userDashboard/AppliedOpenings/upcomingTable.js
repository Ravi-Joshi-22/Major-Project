import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton/IconButton";
import ClearIcon from "material-ui/svg-icons/content/clear";
import MoreIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";

class UpcomingTable extends React.Component {
  constructor(props) {
    super(props);
    this.getDateStr = this.getDateStr.bind(this);
  }

  getDateStr(date) {
    const dateStr = new Date(date);
    const sDateStr =
      dateStr.getDate() +
      "- " +
      (dateStr.getMonth() + 1) +
      "- " +
      dateStr.getFullYear();
    return sDateStr;
  }

  render() {
    const fieldsU = [
      "COMPANY NAME",
      "PROFILE",
      "LOCATION",
      "EXPERIENCE",
      "START DATE",
      "END DATE",
      "MORE"
    ];
  
    return (
      <MuiThemeProvider>
        <table selectable={false}>
          <thead displaySelectAll={false} adjustForCheckbox={false}>
            <tr>
              {fieldsU.map((eachField, key) => (
                <th style={{ width: "15%" }}>{eachField}</th>
              ))}
            </tr>
          </thead>
          <tbody displayRowCheckbox={false}>
            <tr>
              <td style={{ width: "15%" }}>
                {this.props.interviewData.company_id}
              </td>
              <td style={{ width: "20%" }}>
                {this.props.interviewData.position}
              </td>
              <td style={{ width: "10%" }}>
                {this.props.interviewData.location}
              </td>
              <td style={{ width: "15%" }}>
                {this.props.interviewData.experience_min} -{" "}
                {this.props.interviewData.experience_max} yrs
              </td>
              <td style={{ width: "10%" }}>{this.getDateStr(this.props.interviewData.start_date)}</td>
              <td style={{ width: "10%" }}>{this.getDateStr(this.props.interviewData.end_date)}</td>
              <td style={{ width: "10%" }}>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </td>
              <td style={{ width: "10%" }}>
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
      </MuiThemeProvider>
    );
  }
}

export default UpcomingTable;
