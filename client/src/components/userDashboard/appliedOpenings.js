import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CurrentTable from './AppliedOpenings/currentTable';
import UpcomingTable from './AppliedOpenings/upcomingTable';
import BackIcon from 'material-ui/svg-icons/av/fast-rewind';
import { FlatButton } from 'material-ui';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import * as actions from '../../actions/interviewee';

class AppliedOpenings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAppliedOpenings();
  }

  renderCurrentTableContent() {
    const { intervieweeOpenings } = this.props;
    const currentArray = intervieweeOpenings.currentOpenings;
    return <CurrentTable interviewData={currentArray} />;
  }

  renderUpcomingTableContent() {
    const { intervieweeOpenings } = this.props;
    const upcomingArray = intervieweeOpenings.upcomingOpenings;
    return <UpcomingTable interviewData={upcomingArray} />;
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 10, margin: 0 }}>
          <CardText style={{ padding: 2 }}>
            <Subheader>
              <font color="#00BCD4">Current Applied Openings</font>
            </Subheader>
            <Divider />
            <div>
              {this.props.intervieweeOpenings
                ? this.renderCurrentTableContent()
                : null}
            </div>
            <Subheader>
              <font color="#00BCD4">Upcoming Applied Openings</font>
            </Subheader>
            <Divider />
            <div>
              {this.props.intervieweeOpenings
                ? this.renderUpcomingTableContent()
                : null}
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ intervieweeOpenings }) {
  return { intervieweeOpenings };
}
export default connect(mapStateToProps, actions)(AppliedOpenings);
