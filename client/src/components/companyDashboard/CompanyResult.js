import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/company';
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
    this.state = {};
    this.renderDetailsContent = this.renderDetailsContent.bind(this);
    this.renderResultContent = this.renderResultContent.bind(this);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  async componentDidMount() {
    await this.props.companyOpeningResults(this.props.resultOpeningId, '');
  }

  renderDetailsContent() {
    return (
      <OpeningDetailCard
        details={this.props.intervieweeOpenings.individualOpening}
        openingId={this.props.resultOpeningId}
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

  render() {
    const contentStyle = {
      marginTop: 30,
    };
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="columns">
            <div className="column is-1" />
            <div className="column is-10">
              {this.renderDetailsContent()}
              {this.renderResultContent()}
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
