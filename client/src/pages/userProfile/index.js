import React from 'react';
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
import { teal300, teal100, teal200, lightBlue500, lightBlue50 } from 'material-ui/styles/colors';

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
      <MuiThemeProvider >
        <div className="content">
          <UserDrawer muiTheme={muiTheme} />
          <div className="columns">
            <div className="column is-8">
              <div className="columns">
                <div className="column is-4">
                  <img
                    style={{
                      borderRadius: 3000,
                      height: 200,
                      width: 200,
                      margin: 15,
                    }}
                    src="/Assets/shreya.jpg"
                    alt="UserProfile"
                  />
                </div>
                <div className="column is-8">
                  <Personal style={{ margin: 20 }} muiTheme={muiTheme} />
                </div>
              </div>
              <Experience muiTheme={muiTheme} />
              <Education muiTheme={muiTheme} />
              <Projects muiTheme={muiTheme} />
            </div>
            <div className="column is-4">
              <PerPaper muiTheme={muiTheme} />
              <SkillsCard muiTheme={muiTheme} />
              <Courses muiTheme={muiTheme} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default UserProfile;
