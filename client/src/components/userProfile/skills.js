import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import SkillChip from "./skillchips";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';

class SkillsCard extends React.Component {
  

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <CardTitle title="Skills Acquired" />
          <CardText style={{ padding: 2 }}>
            <SkillChip />
            <br/>
            <FlatButton label="ADD MORE SKILLS" primary={true}fullWidth={true} icon={<AddIcon/>}/>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default SkillsCard;
