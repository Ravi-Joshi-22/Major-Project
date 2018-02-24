import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";

class ElligibleTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = [
      "LOCATION",
      "MIN EXPERIENCE",
      "START DATE",
      "END DATE",
      "SALARY",
      "APPLY"
    ];
    const sDate = new Date(this.props.interviewData.start_date);
    const eDate = new Date(this.props.interviewData.end_date);
    const sDateStr =
      sDate.getDate() +
      "-" +
      (sDate.getMonth() + 1) +
      "-" +
      sDate.getFullYear();
    const eDateStr =
      eDate.getDate() +
      "-" +
      (eDate.getMonth() + 1) +
      "-" +
      eDate.getFullYear();
    console.log(sDateStr);
    console.log(eDateStr);

    return (
      <MuiThemeProvider>
        <table>
          <thead>
            <tr>
              {fields.map((eachField, key) => (
                <th style={{ width: "15%" }}>{eachField}</th>
              ))}
            </tr>
          </thead>
          <tbody displayRowCheckbox={false}>
            <tr>
              <td style={{ width: "20%" }}>
                {this.props.interviewData.location}
              </td>
              <td style={{ width: "15%" }}>
                {this.props.interviewData.experience_min}
              </td>
              <td style={{ width: "20%" }}>{sDateStr}</td>
              <td style={{ width: "20%" }}>{eDateStr}</td>
              <td style={{ width: "15%" }}>
                {this.props.interviewData.salary}
              </td>
              <td style={{ width: "20%" }}>
                <RaisedButton label="APPLY" primary={true} />
              </td>
            </tr>
          </tbody>
        </table>
      </MuiThemeProvider>
    );
  }
}

export default ElligibleTable;
