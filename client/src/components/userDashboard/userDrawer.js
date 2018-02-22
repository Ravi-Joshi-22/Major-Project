import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import List from "material-ui/List";
import Subheader from "material-ui/Subheader";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import ProfileAvatar from "./profileAvatar";
import HamburgerIcon from "material-ui/svg-icons/navigation/menu";
import Divider from "material-ui/Divider";

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
      <MuiThemeProvider>
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
              <MenuItem onClick={this.handleClose}>Elligible Openings</MenuItem>
              <MenuItem
                onClick={() => {
                  console.log("toggle2")
                  this.props.appliedOpeningCallback();
                }}
              >
                Applied Openings
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                Previous Interviews
              </MenuItem>
              <MenuItem onClick={this.handleClose}>My History</MenuItem>
              <MenuItem onClick={this.handleClose}>Home</MenuItem>
              <MenuItem onClick={this.handleClose}>Help</MenuItem>
              <MenuItem onClick={this.handleClose}>Feedback</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </List>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default UserDrawer;
