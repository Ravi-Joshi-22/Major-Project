import React from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import PrefsChip from "./preferenceChip";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';

class PrefsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 20 }}>
          <CardTitle title="Your Preferences" />
          <CardText style={{ padding: 2 }}>
            <PrefsChip />
            <FlatButton label="ADD MORE SKILLS" primary={true} icon={<AddIcon/>}/>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default PrefsCard;
