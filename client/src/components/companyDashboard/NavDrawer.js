import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

export default class NavDrawer extends React.Component {
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
      </div>
    );
  }
}
