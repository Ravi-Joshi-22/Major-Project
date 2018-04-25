import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Internship from '../userProfile/UserDetailsForm/Internship';
import Jobs from '../userProfile/UserDetailsForm/Jobs';
import * as actions from '../../actions/interviewee/experience';
import { Tabs, Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
    this.renderExperience = this.renderExperience.bind(this);
    this.renderInternships = this.renderInternships.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
    this.deleteIntership = this.deleteIntership.bind(this);
    this.deleteJob = this.deleteJob.bind(this);
  }
  handleChange = value => {
    this.setState({
      value: value,
    });
  };
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
      <div className="columns">
        <div className="column is-10">
          <Divider />
          <CardHeader title={eachExp.organization} subtitle={eachExp.profile} />
          <CardText style={{ padding: 2 }}>
            {eachExp.location}
            <br /> {this.getDateStr(eachExp.start_date)}
            <br />
            {eachExp.description}
            <br />
          </CardText>
        </div>
        <div className="column is-2">
          <CardActions>
            <FloatingActionButton mini={true} style={{ margin: 8, padding: 2 }}>
              <DeleteIcon onClick={() => this.deleteJob(eachExp._id)} />
            </FloatingActionButton>
          </CardActions>
        </div>
      </div>
    ));
    return expCards;
  }

  renderInternships() {
    const expCards = this.props.internshipExperience.map((eachExp, key) => (
      <div className="columns">
        <div className="column is-10">
          <Divider />
          <CardHeader title={eachExp.organization} subtitle={eachExp.profile} />
          <CardText style={{ padding: 2 }}>
            {eachExp.location}
            <br />
            {this.getDateStr(eachExp.start_date)}
            <br />
            {eachExp.description}
            <br />
          </CardText>
        </div>
        <div className="column is-2">
          <CardActions>
            <FloatingActionButton mini={true} style={{ margin: 5, padding: 2 }}>
              <DeleteIcon onClick={() => this.deleteIntership(eachExp._id)} />
            </FloatingActionButton>
          </CardActions>
        </div>
      </div>
    ));
    return expCards;
  }

  render() {
    const { jobExperience, internshipExperience } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <CardTitle title="Experience" />
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="JOBS" value="a">
              <div className="columns">
                <div className="column is-11">
                  <p>
                    {jobExperience.length > 0
                      ? this.renderExperience()
                      : 'No Job Experience'}
                  </p>
                </div>
                <div className="column is-2">
                  <Jobs />
                </div>
              </div>
            </Tab>
            <Tab label="INTERNSHIPS" value="b">
              <div className="columns">
                <div className="column is-11">
                  <p>
                    {internshipExperience.length > 0
                      ? this.renderInternships()
                      : 'No Internship done till date'}
                  </p>
                </div>
                <div className="column is-2">
                  <Internship />
                </div>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(Experience);
