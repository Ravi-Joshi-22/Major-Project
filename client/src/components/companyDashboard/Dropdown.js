import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div
            className="navbar-item has-dropdown is-hoverable column-8"
            style={{ paddingRight: 40 }}
          >
            <a className="navbar-link">
              <Avatar src="./Assets/Employee.svg" size={30} />
            </a>
            <div className="navbar-dropdown">
              <a className="navbar-item">Profile</a>
              <hr className="navbar-divider" />
              <a
                className="navbar-item is-active"
                onClick={() => this.props.logout()}
              >
                Logout
              </a>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(Dropdown);
