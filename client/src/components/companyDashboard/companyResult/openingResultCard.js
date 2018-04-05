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

    this.renderResults = this.renderResults.bind(this);
  }

  renderResults() {
    if (this.props.results && this.props.results.length > 0) {
      const resultData = this.props.results.map((eachResult, key) => {
        return (
          <TableRow>
            <TableRowColumn>
              {eachResult.user_id.first_name +
                ' ' +
                eachResult.user_id.last_name}
            </TableRowColumn>
            <TableRowColumn>{eachResult.score}</TableRowColumn>
            <TableRowColumn>{eachResult.interview_status}</TableRowColumn>
          </TableRow>
        );
      });
      return resultData;
    } else {
      return <p> No data available </p>;
    }
  }

  render() {
    console.log(this.props.results);
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
              <TableBody>{this.renderResults()}</TableBody>
            </Table>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default OpeningResultCard;
