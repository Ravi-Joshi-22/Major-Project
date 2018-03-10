import React from "react";
import Home from "./home";
import AppliedOpenings from "./appliedOpenings";

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
    }

    return showArea;
  }

  render() {
    return (<div>{this.show()}</div>);
  }
}

export default MainArea;
