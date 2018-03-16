import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50,
} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import HamburgerIcon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import NavDrawer from '../../NavDrawer';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { RaisedButton } from 'material-ui';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    // canvasColor:lightBlue50,
    shadowColor: lightBlue500,
  },
});

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const contentStyle = {
      marginTop: 30,
    };

    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar
              title="SmartHyre"
              iconElementLeft={
                <IconButton>
                  <HamburgerIcon />
                </IconButton>
              }
              onLeftIconButtonClick={this.handleToggle}
              style={{ width: '114%', marginLeft: '-7%' }}
            />
            <div style={contentStyle}>
              <Drawer
                muiTheme={muiTheme}
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={open => this.setState({ open })}
              >
                <div>
                  <NavDrawer
                    muiTheme={muiTheme}
                    close={() => this.setState({ open: !this.state.open })}
                    openingCallback={this.openingForm}
                  />
                </div>
              </Drawer>
            </div>
            <div>
              <Card style={{ padding: 5, margin: 20 }}>
                <CardTitle title="Software Developer" />
                <CardText>
                  <table>
                    <tbody displayRowCheckbox={false}>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>START DATE</b>
                        </td>
                        <td style={{ width: '25%' }}>12/04/2018</td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>END DATE</b>
                        </td>
                        <td style={{ width: '25%' }}>23/04/2018</td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>LOCATION</b>
                        </td>
                        <td style={{ width: '25%' }}>Indore</td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>SALARY</b>
                        </td>
                        <td style={{ width: '25%' }}>5.5 lakhs</td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>SKILLS</b>
                        </td>
                        <td style={{ width: '25%' }}>
                          Java, C++, HTML, Oracle
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>MINIMUM EXPERIENCE</b>
                        </td>
                        <td style={{ width: '25%' }}>0 yr(s)</td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>MAXIMUM EXPERIENCE</b>
                        </td>
                        <td style={{ width: '25%' }}>5 yr(s)</td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>RESPONSIBILITIES</b>
                        </td>
                        <td style={{ width: '25%' }}>
                          To develop java software
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: '25%' }}>
                          <b>QUALIFICATIONS</b>
                        </td>
                        <td style={{ width: '25%' }}>B.E./B.Tech</td>
                      </tr>
                    </tbody>
                  </table>
                </CardText>
                <CardTitle title="Candidate Status" subtitle="8 applied" />
              </Card>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default DetailsPage;
