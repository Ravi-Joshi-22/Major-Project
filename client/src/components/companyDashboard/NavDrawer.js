import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router-dom';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import * as actions from '../../actions/app';
import { connect } from 'react-redux';

class NavDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Card>
          <CardMedia
            overlay={
              <CardTitle title="Recruiter" subtitle="Recruiter details" />
            }
          >
            <img src="./Assets/Recruiter.svg" alt="" />
          </CardMedia>
        </Card>
        <MenuItem
          onClick={() => {
            this.props.mainAreaCallback('mainArea');
          }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.openingCallback();
          }}
        >
          Add Openings
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.mainAreaCallback('View Opening');
          }}
        >
          View Openings
        </MenuItem>
        <MenuItem
          onClick={() => {
            this.props.logout(this.props.history);
          }}
        >
          Log Out
        </MenuItem>
      </div>
    );
  }
}

export default connect(null, actions)(withRouter(NavDrawer));
