import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton/IconButton';
import ClearIcon from "material-ui/svg-icons/content/clear";
import MoreIcon from "material-ui/svg-icons/hardware/keyboard-arrow-right";

class UpcomingTable extends React.Component {
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
    ];
    return (
      <MuiThemeProvider>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
            {fields.map((eachField, key) => (
                <TableHeader style={{ width: "14%" }}>{eachField}</TableHeader>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{ width: '15%' }}>
                  {this.props.interviewData.companyName}
                </TableRowColumn>
                <TableRowColumn style={{ width: '20%' }}>
                  {this.props.interviewData.profile}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  {this.props.interviewData.location}
                </TableRowColumn>
                <TableRowColumn style={{ width: '15%' }}>
                  {this.props.interviewData.experience}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  {this.props.interviewData.startDate}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  {this.props.interviewData.endDate}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                <IconButton><MoreIcon/></IconButton>
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                <IconButton><ClearIcon/></IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default UpcomingTable;