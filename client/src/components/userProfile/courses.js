import React from 'react';
import {
  Card,
  CardTitle,
  CardMedia,
  CardActions,
  CardText,
} from 'material-ui/Card';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Course from '../userProfile/UserDetailsForm/Courses';
import Test from '../userProfile/UserDetailsForm/Test';
import Certification from '../userProfile/UserDetailsForm/Certification';
import * as actions from '../../actions/interviewee/courses';

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.renderCourses = this.renderCourses.bind(this);
    this.renderTests = this.renderTests.bind(this);
    this.renderCertification = this.renderCertification.bind(this);
    this.deleteCoure = this.deleteCourse.bind(this);
    this.deleteTests = this.deleteTests.bind(this);
    this.deleteCertifications = this.deleteCertifications.bind(this);
  }
  deleteCourse(courseId) {
    const requestObj = {
      course: {
        _id: courseId,
      },
    };
    this.props.deleteCourses(requestObj);
  }
  deleteTests(testId) {
    const requestObj = {
      test: {
        _id: testId,
      },
    };
    this.props.deleteTest(requestObj);
  }
  deleteCertifications(testId) {
    const requestObj = {
      certification: {
        _id: testId,
      },
    };
    this.props.deleteCertificate(requestObj);
  }

  renderCourses() {
    const courseCards = this.props.courses.map((eachCourse, key) => (
      <Card style={{ margin: 10 }}>
        <CardMedia
          overlay={
            <CardTitle title={eachCourse.name} subtitle={eachCourse.number} />
          }
        >
          <img src="/Assets/andriod.png" alt="" />
        </CardMedia>
        <CardActions>
          <FloatingActionButton mini={true} style={{ margin: 5 }}>
            <DeleteIcon onClick={() => this.deleteCourse(eachCourse._id)} />
          </FloatingActionButton>
        </CardActions>
        <CardText style={{ margin: 5 }}>
          {eachCourse.description}
          <br />
        </CardText>
        <CardActions>
          <RaisedButton
            label="View Certificate"
            primary={true}
            fullWidth={true}
            href={eachCourse.url}
          />
        </CardActions>
      </Card>
    ));
    return courseCards;
  }
  renderTests() {
    const testCards = this.props.test.map((eachTest, key) => (
      <Card style={{ margin: 10 }}>
        <CardMedia
          overlay={<CardTitle title={eachTest.name} subtitle="By google" />}
        >
          <img src="/Assets/andriod.png" alt="" />
        </CardMedia>
        <CardActions>
          <FloatingActionButton mini={true} style={{ margin: 5 }}>
            <DeleteIcon onClick={() => this.deleteTests(eachTest._id)} />
          </FloatingActionButton>
        </CardActions>
        <CardText style={{ margin: 5 }}>
          {eachTest.score} <br />
          {eachTest.description}
          <br />
        </CardText>
        <CardActions>
          <RaisedButton
            label="View Certificate"
            primary={true}
            fullWidth={true}
            href={eachTest.url}
          />
        </CardActions>
      </Card>
    ));
    return testCards;
  }
  renderCertification() {
    const certificationCards = this.props.certification.map(
      (eachCertification, key) => (
        <Card style={{ margin: 10 }}>
          <CardMedia
            overlay={
              <CardTitle
                title={eachCertification.name}
                subtitle={eachCertification.authority}
              />
            }
          >
            <img src="/Assets/andriod.png" alt="" />
          </CardMedia>
          <CardActions>
            <FloatingActionButton mini={true} style={{ margin: 5 }}>
              <DeleteIcon
                onClick={() => this.deleteCertifications(eachCertification._id)}
              />
            </FloatingActionButton>
          </CardActions>
          <CardText style={{ margin: 5 }}>
            {eachCertification.lic_number}
            <br />
          </CardText>
          <CardActions>
            <RaisedButton
              label="View Certificate"
              primary={true}
              fullWidth={true}
            />
          </CardActions>
        </Card>
      )
    );
    return certificationCards;
  }
  render() {
    const { courses, test, certification } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-8">
              <CardTitle title="Courses Done and Certification" />
            </div>
            <div className="column is-4">
              <Course />
              <Test />
              <Certification />
            </div>
          </div>
          <div>
            {courses.length > 0 ? this.renderCourses() : null}
            {test.length > 0 ? this.renderTests() : null}
            {certification.length > 0 ? this.renderCertification() : null}
          </div>
          <FlatButton label=">>View More" primary={true} fullWidth={true} />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(Courses);
