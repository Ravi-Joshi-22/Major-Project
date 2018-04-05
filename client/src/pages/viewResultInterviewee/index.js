import React from 'react';
import GridView from '../../components/userDashboard/Result/GridView';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardTitle, CardText } from 'material-ui/Card';

class ViewResult extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Card style={{ padding: 10, margin: 20 }}>
            <CardTitle title="Previous Interviews" />
          </Card>
          <GridView />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ViewResult;
