import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import ViewIcon from 'material-ui/svg-icons/image/remove-red-eye';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { IconButton } from 'material-ui';

const ProfileAvatar = () => (
  <Card>
    <CardMedia
      overlay={<CardTitle title="Shivani Mulay"/>}
    >
      <img src="/Assets/headprofile.png" alt="Profile Picture" />
    </CardMedia>
    <CardActions>
    <IconButton tooltip='Edit'>
    <EditIcon/>
    </IconButton>
    <IconButton tooltip='View'>
    <ViewIcon/>
    </IconButton>
    </CardActions>
  </Card>
);

export default ProfileAvatar;