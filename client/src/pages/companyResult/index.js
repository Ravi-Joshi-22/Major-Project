import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/company';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavDrawer from '../../components/companyDashboard/NavDrawer';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import HamburgerIcon from 'material-ui/svg-icons/navigation/menu';
import BackIcon from 'material-ui/svg-icons/av/replay';
import Avatar from 'material-ui/Avatar';
import OpeningDetailCard from '../../components/companyDashboard/companyResult/openingDetailCard';
import OpeningResultCard from '../../components/companyDashboard/companyResult/openingResultCard';
import IconButton from 'material-ui/IconButton';
import Payment from '../../components/companyDashboard/payment';
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
    this.renderDetailsContent = this.renderDetailsContent.bind(this);
    this.renderResultContent = this.renderResultContent.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  async componentDidMount() {
    await this.props.companyOpeningResults('5ab6171c38d25118a8f0e0cc', '');
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  renderDetailsContent() {
    return (
      <OpeningDetailCard
        details={this.props.intervieweeOpenings.individualOpening}
      />
    );
  }

  renderResultContent() {
    return (
      <OpeningResultCard
        results={this.props.intervieweeOpenings.individualOpening.interviewees}
      />
    );
  }

  renderContent() {
    this.renderDetailsContent();
    this.renderResultContent();
  }
  render() {
    const contentStyle = {
      marginTop: 30,
    };

    console.log(
      Object.keys(this.props.intervieweeOpenings.individualOpening).length
    );
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
            <div className="columns">
              <div className="column is-10">
                <OpeningDetailCard
                  details={this.props.intervieweeOpenings.individualOpening}
                />
                <OpeningResultCard
                  results={
                    this.props.intervieweeOpenings.individualOpening
                      .interviewees
                  }
                />
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ intervieweeOpenings, loading }) {
  return { intervieweeOpenings, loading };
}
export default connect(mapStateToProps, actions)(CompanyResult);
