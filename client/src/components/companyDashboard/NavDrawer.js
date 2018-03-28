import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class NavDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const fabStyle = {
      marginLeft: 205,
      marginTop: 10,
    };

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
