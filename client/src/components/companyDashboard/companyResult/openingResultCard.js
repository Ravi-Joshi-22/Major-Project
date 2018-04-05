import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class OpeningResultCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = ['NAME OF INTERVIEWEE', 'SCORE OBTAINED', 'STATUS'];
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 25, margin: 20 }}>
          <CardTitle title="Interviewee Details" />
          <CardText style={{ padding: 2 }}>
            <Table displayRowCheckbox={false} selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableHeaderColumn>
                  {fields.map((eachField, key) => (
                    <TableRowColumn style={{ width: '15%' }}>
                      {eachField}
                    </TableRowColumn>
                  ))}
                </TableHeaderColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>25</TableRowColumn>
                  <TableRowColumn>Selected</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Randal White</TableRowColumn>
                  <TableRowColumn>50</TableRowColumn>
                  <TableRowColumn>Selected</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Stephanie Sanders</TableRowColumn>
                  <TableRowColumn>60</TableRowColumn>
                  <TableRowColumn>Rejected</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Steve Brown</TableRowColumn>
                  <TableRowColumn>44</TableRowColumn>
                  <TableRowColumn>Given</TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Christopher Nolan</TableRowColumn>
                  <TableRowColumn>53</TableRowColumn>
                  <TableRowColumn>Applied</TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default OpeningResultCard;
