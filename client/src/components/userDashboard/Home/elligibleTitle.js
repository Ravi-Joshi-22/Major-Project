import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class ElligibleTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 20 }}>
          <CardTitle
            title="Your Elligible Openings"
            subtitle="Following jobs are filtered out according to your profile"
          />
          <CardText style={{ padding: 2 }}>
            Worried for job? Lack of oppotunities? Unstable Job?
            We at <b>SmartHyre</b>, provide you with immense oppotunities matching your profile and preferences. Just scroll below, find a suitable match and apply. Give your best and make your dreams come true.
            We wish you, all the best for your future endeavours!!
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default ElligibleTitle;