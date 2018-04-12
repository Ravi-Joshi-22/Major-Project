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
import NavDrawer from './NavDrawer';
import OpeningsCard from './viewOpenings/openingsCard';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { connect } from 'react-redux';
import * as actions from '../../actions/company';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    // canvasColor:lightBlue50,
    shadowColor: lightBlue500,
  },
});

class ViewOpeningsMainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      companyOpenings: '',
    };
    this.showResult = this.showResult.bind(this);
  }

  showResult(e) {
    this.props.resultCallback(e);
  }

  componentDidMount() {
    this.props.companyViewOpenings();
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const contentStyle = {
      marginTop: 30,
    };
    const { intervieweeOpenings } = this.props;
    const companyOpenings = intervieweeOpenings.companyCreatedOpenings;
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <div style={contentStyle}>
              <div>
                <div className="columns">
                  <div className="column is-2" />
                  <div className="column is-8">
                    {companyOpenings.map((eachOpening, key) => (
                      <OpeningsCard
                        openingsData={eachOpening}
                        mainAreaCallback={this.showResult}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ intervieweeOpenings }) {
  return { intervieweeOpenings };
}
export default connect(mapStateToProps, actions)(ViewOpeningsMainPage);
