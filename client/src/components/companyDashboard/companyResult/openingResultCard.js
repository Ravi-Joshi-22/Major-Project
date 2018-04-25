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

const styles = {
  customWidth: {
    width: 200,
  },
};

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
            <TableRowColumn style={{ width: '33%' }}>
              {eachResult.user_id.first_name.toUpperCase()}{' '}
              {eachResult.user_id.last_name
                ? eachResult.user_id.last_name.toUpperCase()
                : ' '}
            </TableRowColumn>
            <TableRowColumn style={{ width: '33%' }}>
              {eachResult.score.toFixed(2)}
            </TableRowColumn>
            {eachResult.interview_status === 'selected' ? (
              <TableRowColumn style={{ color: 'green', width: '33%' }}>
                {eachResult.interview_status.toUpperCase()}
              </TableRowColumn>
            ) : eachResult.interview_status === 'applied' ? (
              <TableRowColumn style={{ color: 'brown', width: '33%' }}>
                {eachResult.interview_status.toUpperCase()}
              </TableRowColumn>
            ) : eachResult.interview_status === 'rejected' ? (
              <TableRowColumn style={{ color: 'red', width: '33%' }}>
                {eachResult.interview_status.toUpperCase()}
              </TableRowColumn>
            ) : (
              <TableRowColumn style={{ color: 'blue', width: '33%' }}>
                {eachResult.interview_status.toUpperCase()}
              </TableRowColumn>
            )}
          </TableRow>
        );
      });
      return resultData;
    } else {
      return <p> No data available </p>;
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 25, margin: 20 }}>
          <CardTitle title="Results" />
          <CardText style={{ padding: 2 }}>
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
                {this.renderResults()}
              </TableBody>
            </Table>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default OpeningResultCard;
