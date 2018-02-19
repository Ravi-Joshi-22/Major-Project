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
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

class ElligibleTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '20%' }}>
                LOCATION
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '15%' }}>
                EXPERIENCE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '20%' }}>
                START DATE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '20%' }}>
                END DATE
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '15%' }}>
                SALARY
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '20%' }}>
                APPLY
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.interviewData.map((eachInterview, key) => (
              <TableRow>
                <TableRowColumn style={{ width: '20%' }}>
                  {eachInterview.location}
                </TableRowColumn>
                <TableRowColumn style={{ width: '15%' }}>
                  {eachInterview.experience}
                </TableRowColumn>
                <TableRowColumn style={{ width: '20%' }}>
                  {eachInterview.sDate}
                </TableRowColumn>
                <TableRowColumn style={{ width: '20%' }}>
                  {eachInterview.eDate}
                </TableRowColumn>
                <TableRowColumn style={{ width: '15%' }}>
                  {eachInterview.salary}
                </TableRowColumn>
                <TableRowColumn style={{ width: '20%' }}>
                    <RaisedButton label="APPLY" primary={true} />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default ElligibleTable;