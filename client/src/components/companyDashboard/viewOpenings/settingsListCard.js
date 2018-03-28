import React from 'react';
import { List, ListItem } from 'material-ui/List';
import EditIcon from 'material-ui/svg-icons/content/create';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const SettingsListCard = () => (
  <MuiThemeProvider>
    <Card style={{ padding: 5, margin: 20 }}>
      <List>
        <ListItem primaryText="Create New Opening" leftIcon={<AddIcon />} />
        <ListItem primaryText="Delete Openings" leftIcon={<DeleteIcon />} />
        <ListItem primaryText="Edit Openings" leftIcon={<EditIcon />} />
      </List>
    </Card>
  </MuiThemeProvider>
);

export default SettingsListCard;
