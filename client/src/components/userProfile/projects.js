import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  CardExpandable,
} from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IconButton } from 'material-ui';
const iconStyles = {
  marginRight: 10,
  marginTop: 5,
};
class Project extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-10">
              <CardTitle title="Project Undertaken" />
              <Card>
                <CardHeader
                  title="SmartHyre"
                  subtitle="Full Stack"
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardText expandable={true}>
                  <h5>July 2018-May 2018</h5>
                  Here Description will be added
                  <CardActions>
                    <RaisedButton label="View Link" primary={true} />
                  </CardActions>
                </CardText>
              </Card>
              <br />
              <Card>
                <CardHeader
                  title="Seekpeek"
                  subtitle="Andriod"
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardText expandable={true}>
                  <h5>July 2018-May 2018</h5>
                  Here Description will be added
                  <CardActions>
                    <RaisedButton label="View Link" primary={true} />
                  </CardActions>
                </CardText>
              </Card>
            </div>
            <div className="column is-2">
              <IconButton tooltip="Edit">
                <AddIcon />
              </IconButton>
              <FloatingActionButton mini={true} style={iconStyles}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
          <FlatButton label=">>View More" primary={true} fullWidth={true} />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Project;
