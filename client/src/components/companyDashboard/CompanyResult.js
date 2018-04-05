import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavDrawer from './NavDrawer';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import HamburgerIcon from 'material-ui/svg-icons/navigation/menu';
import BackIcon from 'material-ui/svg-icons/av/replay';
import Avatar from 'material-ui/Avatar';
import OpeningDetailCard from './companyResult/openingDetailCard';
import OpeningResultCard from './companyResult/openingResultCard';
import IconButton from 'material-ui/IconButton';
import Payment from './payment';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50,
} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton/FlatButton';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    shadowColor: lightBlue500,
  },
});

class CompanyResult extends React.Component {
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
              iconElementRight={
                <div
                  className="control columns"
                  style={{ margin: 'auto 15px auto 0' }}
                >
                  <div className="column-84">
                    <span>
                      <span
                        style={{
                          color: '#fff',
                          fontSize: 27,
                          marginTop: 'auto',
                        }}
                      >
                        <img src="./Assets/coin.svg" style={{ height: 20 }} />{' '}
                      </span>
                      <Payment />
                    </span>
                  </div>
                  <div
                    className="navbar-item has-dropdown is-hoverable column-8"
                    style={{ paddingRight: 40 }}
                  >
                    <a className="navbar-link" href="#">
                      <Avatar src="./Assets/Employee.svg" size={30} />
                    </a>
                    <div className="navbar-dropdown">
                      <a className="navbar-item" href="#">
                        Profile
                      </a>
                      <hr className="navbar-divider" />
                      <a className="navbar-item is-active" href="#">
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              }
              onLeftIconButtonClick={this.handleToggle}
              style={{ width: '114%', marginLeft: '-7%' }}
            />
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
                />
              </div>
            </Drawer>
          </div>
          <div className="columns">
            <div className="column is-10">
              <OpeningDetailCard />
              <OpeningResultCard />
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({}) {
  return {};
}
export default connect(mapStateToProps)(CompanyResult);
