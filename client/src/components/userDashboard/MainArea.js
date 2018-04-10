import React from "react";
import Home from "./home";
import AppliedOpenings from "./appliedOpenings";
import ViewResult from "./ViewResult";
import UserProfile from "../userProfile/UserProfile";

class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.show = this.show.bind(this);
  }

  show() {
    var showArea = <Home muiTheme={this.props.muiTheme} />;
    if (this.props.showArea === "home") {
      showArea = <Home muiTheme={this.props.muiTheme} />;
    } else if (this.props.showArea === "appliedOpening") {
      showArea = <AppliedOpenings muiTheme={this.props.muiTheme} />;
    } else if (this.props.showArea === "profile") {
      showArea = <UserProfile muiTheme={this.props.muiTheme} />;
    }else if (this.props.showArea === "result") {
      showArea = <ViewResult muiTheme={this.props.muiTheme} />;
    }

    return showArea;
  }

  render() {
    return (<div>{this.show()}</div>);
  }
}

export default MainArea;
