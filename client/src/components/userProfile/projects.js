import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { IconButton } from 'material-ui';
import Project from '../IntervieweeRegister/Project';
import EditIcon from 'material-ui/svg-icons/image/edit';
class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
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
                    <IconButton className="icon" tooltip="Edit">
                      <EditIcon />
                    </IconButton>
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
                    <IconButton className="icon" tooltip="Edit">
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </CardText>
              </Card>
            </div>
            <div className="column is-1">
              <Project />
            </div>
          </div>
          <FlatButton label=">>View More" primary={true} fullWidth={true} />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Projects;
