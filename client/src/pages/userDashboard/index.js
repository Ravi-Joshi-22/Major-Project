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
              appliedOpeningCallback={this.appliedOpening}
              homeCallback={this.home}
            />
            <MainArea showArea={this.state.MainArea} />
            {/* <Footer /> */}
          </div>
        </div>
        {this.props.loading.isloading ? <BusyIndicator /> : null}
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}
export default connect(mapStateToProps)(UserDashboard);
