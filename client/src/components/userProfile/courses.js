import React from 'react';
import {
  Card,
  CardTitle,
  CardMedia,
  CardActions,
  CardText,
} from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { IconButton } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
const iconStyles = {
  marginRight: 50,
  marginTop: 5,
};
const icon = {};
class Courses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-10">
              <CardTitle title="Courses Done and Certification" />
            </div>
            <div className="column is-2">
              <FloatingActionButton mini={true} style={iconStyles}>
                <ContentAdd />
              </FloatingActionButton>
              <IconButton tooltip="Edit">
                <AddIcon />
              </IconButton>
            </div>
          </div>
          <Card style={{ margin: 10 }}>
            <CardMedia
              overlay={
                <CardTitle
                  title="Andriod Developer Nanodegree"
                  subtitle="By google"
                />
              }
            >
              <img src="/Assets/andriod.png" alt="" />
            </CardMedia>

            <CardText style={{ margin: 5 }}>
              Learned to develop andriod application<br />
              https://www.google.course.com<br />
            </CardText>
            <CardActions>
              <RaisedButton
                label="View Certificate"
                primary={true}
                fullWidth={true}
              />
            </CardActions>
          </Card>

          <br />
          <Card style={{ margin: 10 }}>
            <CardMedia
              overlay={
                <CardTitle
                  title="Full Stack  web Developer"
                  subtitle="By Udacity"
                />
              }
            >
              <img src="/Assets/full.jpg" alt="" />
            </CardMedia>

            <CardText style={{ margin: 5 }}>
              Worked on reactjs and nodejs<br />
              https://www.udacity.fullstack.com<br />
            </CardText>
            <CardActions>
              <RaisedButton
                label="View Certificate"
                primary={true}
                fullWidth={true}
              />
            </CardActions>
          </Card>
          <FlatButton label=">>View More" primary={true} fullWidth={true} />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Courses;
