import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Internship from '../userProfile/UserDetailsForm/Internship';
import Jobs from '../userProfile/UserDetailsForm/Jobs';
import * as actions from '../../actions/interviewee/experience';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.renderExperience = this.renderExperience.bind(this);
    this.renderInternships = this.renderInternships.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.deleteIntership = this.deleteIntership.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
  }

  getDateStr(date) {
    const dateStr = new Date(date);
    const sDateStr = `${dateStr.getDate()} -
      ${dateStr.getMonth() + 1}-
      ${dateStr.getFullYear()}`;
    return sDateStr;
  }

  deleteIntership(internId) {
    const requestObj = {
      internships: {
        _id: internId,
      },
    };
    this.props.deleteProfession(requestObj);
  }

  deleteJob(jobId) {
    const requestObj = {
      jobs: {
        _id: jobId,
      },
    };
    this.props.deleteProfession(requestObj);
  }

  renderExperience() {
    const expCards = this.props.jobExperience.map((eachExp, key) => (
      <Card style={{ padding: 5, margin: 5 }}>
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
          <FloatingActionButton mini={true} style={{ margin: 5 }}>
            <DeleteIcon onClick={() => this.deleteJob(eachExp._id)} />
          </FloatingActionButton>
        </CardActions>
        <CardHeader title={eachExp.organization} subtitle={eachExp.profile} />
        <CardText style={{ padding: 2 }}>
          {eachExp.location}
          <br /> {this.getDateStr(eachExp.start_date)}
          <br />
          {eachExp.description}
          <br />
        </CardText>
      </Card>
    ));
    return expCards;
  }

  renderInternships() {
    const expCards = this.props.internshipExperience.map((eachExp, key) => (
      <Card style={{ padding: 5, margin: 5 }}>
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
          <FloatingActionButton mini={true} style={{ margin: 5 }}>
            <DeleteIcon onClick={() => this.deleteIntership(eachExp._id)} />
          </FloatingActionButton>
        </CardActions>
        <CardHeader title={eachExp.organization} subtitle={eachExp.profile} />
        <CardText style={{ padding: 2 }}>
          {eachExp.location}
          <br />
          {this.getDateStr(eachExp.start_date)}
          <br />
          {eachExp.description}
          <br />
        </CardText>
      </Card>
    ));
    return expCards;
  }

  render() {
    const { jobExperience, internshipExperience } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-8">
              <CardTitle title="Experience" />
            </div>
            <div className="column is-4">
              <Internship />
              <Jobs />
            </div>
          </div>

          <div className="columns">
            {jobExperience.length > 0 ? this.renderExperience() : null}
            {internshipExperience.length > 0 ? this.renderInternships() : null}
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(Experience);
