import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import List from "material-ui/List";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import HamburgerIcon from "material-ui/svg-icons/navigation/menu";
import Divider from "material-ui/Divider";
import ProfileAvatar from "./UserDrawer/profileAvatar";

class UserDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div>
          <AppBar
            title="SmartHyre"
            iconElementLeft={
              <IconButton>
                <HamburgerIcon />
              </IconButton>
            }
            onLeftIconButtonClick={this.handleToggle}
            style={{ width: "114%", marginLeft: "-7%" }}
          />
          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            onRequestChange={this.handleToggle}
          >
            <List>
              <MenuItem onClick={this.handleClose}>
                <ProfileAvatar />
              </MenuItem>
              <Divider />
              <Subheader> My Account </Subheader>
              <MenuItem
                onClick={() => {
                  this.handleToggle();
                  this.props.homeCallback();
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.handleToggle();
                  this.props.profileCallBack();
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.handleToggle();
                  this.props.appliedOpeningCallback();
                }}
              >
                Applied Openings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  this.handleToggle();
                  this.props.resultCallback();
                }}
              >
                Results
              </MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default UserDrawer;
