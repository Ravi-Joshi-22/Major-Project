import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Card,
  CardTitle,
  CardMedia,
  CardActions,
  CardText,
} from 'material-ui/Card';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Test from '../userProfile/UserDetailsForm/Test';
import * as actions from '../../actions/interviewee/courses';
class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.renderTests = this.renderTests.bind(this);
    this.deleteTests = this.deleteTests.bind(this);
  }
  deleteTests(testId) {
    const requestObj = {
      test: {
        _id: testId,
      },
    };
    this.props.deleteTest(requestObj);
  }

  renderTests() {
    const testCards = this.props.test.map((eachTest, key) => (
      <div>
        <TableRow>
          <TableRowColumn style={{ width: '35%' }}>
            {eachTest.name}
          </TableRowColumn>
          <TableRowColumn style={{ width: '35%' }}>
            {' '}
            {eachTest.score}
          </TableRowColumn>
          <TableRowColumn style={{ width: '25%' }}>
            {eachTest.date}
          </TableRowColumn>
          <TableRowColumn>
            <FloatingActionButton mini={true} style={{ margin: 5, padding: 2 }}>
              <DeleteIcon onClick={() => this.deleteTests(eachTest._id)} />
            </FloatingActionButton>
          </TableRowColumn>
        </TableRow>
      </div>
    ));
    return testCards;
  }
  render() {
    const { test } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
              <CardTitle title="Tests Given" />
            </div>
            <div className="column is-1">
              <Test />
            </div>
          </div>
          <div>
            <Table style={{ showCheckboxes: false }}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>
                    <b> Name </b>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <b>Score</b>
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    <b>Date </b>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {test.length > 0 ? this.renderTests() : 'NO Test Scores'}
              </TableBody>
            </Table>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}
export default connect(null, actions)(Tests);
