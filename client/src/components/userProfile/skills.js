import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import SkillChip from './skillchips';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Skills from '../IntervieweeRegister/Skills';
class SkillsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <CardTitle title="Skills Acquired" />
          <CardText style={{ padding: 2 }}>
            <SkillChip skillsArray={this.props.skills} />
            <br />
            <Skills />
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default SkillsCard;
