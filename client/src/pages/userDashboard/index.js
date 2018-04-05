import React from 'react';
import { connect } from 'react-redux';
import BusyIndicator from '../../components/common/busyIndicator';
import UserDrawer from '../../components/userDashboard/userDrawer';
import MainArea from '../../components/userDashboard/MainArea';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Footer from '../../components/common/footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppliedOpenings from '../../components/userDashboard/appliedOpenings';
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

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MainArea: 'home',
    };
    this.appliedOpening = this.appliedOpening.bind(this);
  }

  home = () => this.setState({ MainArea: 'home' });

  appliedOpening = () => this.setState({ MainArea: 'appliedOpening' });

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="content">
            <UserDrawer
              muiTheme={muiTheme}
              appliedOpeningCallback={this.appliedOpening}
              homeCallback={this.home}
            />
            <MainArea showArea={this.state.MainArea} muiTheme={muiTheme}/>
            {/* <Footer /> */}
          </div>
          {this.props.loading.isloading ? <BusyIndicator /> : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}
export default connect(mapStateToProps)(UserDashboard);
