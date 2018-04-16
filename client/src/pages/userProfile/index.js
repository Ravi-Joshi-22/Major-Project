import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/interviewee';
import BusyIndicator from '../../components/common/busyIndicator';
import UserDrawer from '../../components/userDashboard/userDrawer';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Personal from '../../components/userProfile/personal';
import Education from '../../components/userProfile/education';
import Experience from '../../components/userProfile/experience';
import Courses from '../../components/userProfile/courses';
import SkillsCard from '../../components/userProfile/skills';
import PerPaper from '../../components/userProfile/percentage';
import Projects from '../../components/userProfile/projects';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Tests from '../../components/userProfile/test';
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    // canvasColor:lightBlue50,
    shadowColor: lightBlue500,
  },
});
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserProfileData();
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const customContentStyle = {
      width: '80%',
      maxWidth: 'none',
    };
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleToggle} />,
    ];

    return (
      <MuiThemeProvider>
        <div className="content">
          <UserDrawer muiTheme={muiTheme} />
          <div className="columns">
            <div className="column is-8">
              <div className="columns">
                <div className="column is-4">
                  <img
                    style={{
                      borderRadius: 3000,
                      height: 150,
                      width: 150,
                      margin: 18,
                    }}
                    src="/Assets/Profile.jpeg"
                    alt="UserProfile"
                  />
                </div>
                <div className="column is-8">
                  <Personal
                    style={{ margin: 20 }}
                    muiTheme={muiTheme}
                    personal={this.props.intervieweeProfile.userId}
                  />
                </div>
              </div>
              <Experience
                muiTheme={muiTheme}
                jobExperience={this.props.intervieweeProfile.jobs}
                internshipExperience={this.props.intervieweeProfile.internships}
              />
              <Education
                muiTheme={muiTheme}
                afterEducation={this.props.intervieweeProfile.after_senior_sec}
                beforeEducation={
                  this.props.intervieweeProfile.before_senior_sec
                }
              />
              <Projects
                muiTheme={muiTheme}
                project={this.props.intervieweeProfile.projects}
              />
              <Tests
                muiTheme={muiTheme}
                test={this.props.intervieweeProfile.tests}
              />
            </div>

            <div className="column is-4">
              <PerPaper
                muiTheme={muiTheme}
                percent={this.props.intervieweeProfile.percent}
              />
              <SkillsCard
                muiTheme={muiTheme}
                skills={this.props.intervieweeProfile.skills}
              />
              <Courses
                muiTheme={muiTheme}
                certification={this.props.intervieweeProfile.certifications}
                courses={this.props.intervieweeProfile.courses}
              />
            </div>
          </div>
        </div>
        {this.props.loading.isloading ? <BusyIndicator /> : null}
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps({ intervieweeProfile, loading }) {
  return { intervieweeProfile, loading };
}
export default connect(mapStateToProps, actions)(UserProfile);
