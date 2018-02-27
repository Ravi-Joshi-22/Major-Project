import React from "react";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";

export default class UsersDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  userList() {
    const styles = {
        mediumIcon: {
        width: 48,
        height: 48
      },
      medium: {
        width: 96,
        height: 96,
        padding: 24
      }
    };
    var users = this.props.usersData;
    var usersList = users.map(function(user) {
      return (
        <li style={{ display: "inline" }}>
          <IconButton
            style={styles.medium}
            iconStyle={styles.mediumIcon}
            tooltip={user.first_name + " " + user.last_name}
          >
            <Avatar src="./Assets/Employee.svg" size={30} />
          </IconButton>
        </li>
      );
    });
    return usersList;
  }

  render() {
    return (
      <div>
        <ul>Users{"  "}{this.userList()}</ul>
      </div>
    );
  }
}
