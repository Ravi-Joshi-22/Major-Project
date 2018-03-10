import React from "react";
import * as actions from "../../../actions/interviewee";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";

class ElligibleTable extends React.Component {
  constructor(props) {
    super(props);

    this.applyOpening = this.applyOpening.bind(this);
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

  applyOpening(elligibleOpeningId) {
    const { applyForOpening, getElligibleOpenings } = this.props;
    const openingData = {
      openingId: elligibleOpeningId
    };
    applyForOpening(openingData);
  }

  render() {
    const fields = [
      "LOCATION",
      "EXPERIENCE",
      "START DATE",
      "END DATE",
      "SALARY",
      "APPLY"
    ];

    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
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
              <td style={{ width: "15%" }}>
                {this.props.interviewData.location}
              </td>
              <td style={{ width: "20%" }}>
                {this.props.interviewData.experience_min} -{" "}
                {this.props.interviewData.experience_max} yrs
              </td>
              <td style={{ width: "20%" }}>
                {" "}
                {this.getDateStr(this.props.interviewData.start_date)}
              </td>
              <td style={{ width: "20%" }}>
                {this.getDateStr(this.props.interviewData.end_date)}
              </td>
              <td style={{ width: "15%" }}>
                {this.props.interviewData.salary} lacs
              </td>
              <td style={{ width: "20%" }}>
                <RaisedButton
                  label="APPLY"
                  primary={true}
                  onClick={() =>
                    this.applyOpening(this.props.interviewData._id)
                  }
                  muiTheme={this.props.muiTheme}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(ElligibleTable);
