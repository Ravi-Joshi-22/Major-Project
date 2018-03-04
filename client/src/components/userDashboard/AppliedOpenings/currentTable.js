import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import IconButton from "material-ui/IconButton/IconButton";
import ClearIcon from "material-ui/svg-icons/content/clear";
import MoreIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import GiveIcon from "material-ui/svg-icons/hardware/computer";
import FlatButton from "material-ui/FlatButton";

class CurrentTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = [
      "COMPANY NAME",
      "PROFILE",
      "LOCATION",
      "EXPERIENCE",
      "START DATE",
      "END DATE",
      "MORE",
      "GIVE INTERVIEW",
    ];
    return (
      <MuiThemeProvider>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {fields.map((eachField, key) => (
                <TableHeader style={{ width: "12%" }}>{eachField}</TableHeader>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={{ width: "15%" }}>
                {this.props.interviewData.company_id.company_name}
              </TableRowColumn>
              <TableRowColumn style={{ width: "20%" }}>
                {this.props.interviewData.position}
              </TableRowColumn>
              <TableRowColumn style={{ width: "10%" }}>
                {this.props.interviewData.location}
              </TableRowColumn>
              <TableRowColumn style={{ width: "15%" }}>
              {this.props.interviewData.experience_min} - {
                  this.props.interviewData.experience_max
                } yrs
              </TableRowColumn>
              <TableRowColumn style={{ width: "10%" }}>
                {this.props.interviewData.start_date}
              </TableRowColumn>
              <TableRowColumn style={{ width: "10%" }}>
                {this.props.interviewData.end_date}
              </TableRowColumn>
              <TableRowColumn style={{ width: "5%" }}>
                <IconButton>
                  <MoreIcon />
                </IconButton>
              </TableRowColumn>
              <TableRowColumn style={{ width: "10%" }}>
                <FlatButton label="GIVE" primary={true} icon={<GiveIcon />} />
              </TableRowColumn>
              <TableRowColumn style={{ width: "5%" }}>
                <IconButton>
                  <ClearIcon />
                </IconButton>
              </TableRowColumn>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default CurrentTable;
