import React from 'react';
import {
  Card,
  CardTitle,
  CardMedia,
  CardActions,
  CardText,
} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CourseModal from '../userProfile/modalOpening/courseModal';
import EditIcon from 'material-ui/svg-icons/image/edit';
import { IconButton } from 'material-ui';
class Courses extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-10">
              <CardTitle title="Courses Done and Certification" />
            </div>
            <div className="column is-2">
              <CourseModal />
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
            <CardActions>
              <IconButton className="icon" tooltip="Edit">
                <EditIcon />
              </IconButton>
            </CardActions>
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
            <CardActions>
              <IconButton className="icon" tooltip="Edit">
                <EditIcon />
              </IconButton>
            </CardActions>
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
