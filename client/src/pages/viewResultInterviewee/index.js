import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/interviewee';
import GridView from '../../components/userDashboard/Result/GridView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle, CardText } from 'material-ui/Card';

class ViewResult extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserResults();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card style={{ padding: 10, margin: 7 }}>
            <CardTitle title="Previous Interviews" />
          </Card>
          {this.props.intervieweeOpenings.results.length === 0 ? null : (
            <GridView results={this.props.intervieweeOpenings.results} />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ intervieweeOpenings, loading }) {
  return { intervieweeOpenings, loading };
}
export default connect(mapStateToProps, actions)(ViewResult);
