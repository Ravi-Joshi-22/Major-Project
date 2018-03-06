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
import GiveIcon from 'material-ui/svg-icons/hardware/computer';
import FlatButton from 'material-ui/FlatButton';

class PendingTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '15%' }}>
                COMPANY NAME
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '20%' }}>
                PROFILE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}>
                LOCATION
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '15%' }}>
                EXPERIENCE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}>
                START DATE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}>
                END DATE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%' }}>
                MORE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}>
                GIVE INTERVIEW
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%' }}>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.interviewData.map((eachInterview, key) => (
              <TableRow>
                <TableRowColumn style={{ width: '15%' }}>
                  {eachInterview.companyName}
                </TableRowColumn>
                <TableRowColumn style={{ width: '20%' }}>
                  {eachInterview.profile}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  {eachInterview.location}
                </TableRowColumn>
                <TableRowColumn style={{ width: '15%' }}>
                  {eachInterview.experience}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  {eachInterview.startDate}
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  {eachInterview.endDate}
                </TableRowColumn>
                <TableRowColumn style={{ width: '5%' }}>
                  <IconButton><MoreIcon /></IconButton>
                </TableRowColumn>
                <TableRowColumn style={{ width: '10%' }}>
                  <FlatButton label="GIVE" primary={true} icon={<GiveIcon />} />
                </TableRowColumn>
                <TableRowColumn style={{ width: '5%' }}>
                  <IconButton><ClearIcon /></IconButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default PendingTable;