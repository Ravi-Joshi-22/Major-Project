import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/company";
import "./index.css";
import BusyIndicator from "../../components/common/busyIndicator";
import InInterview from "../../components/interview/InInterview";
import PreInterview from "../../components/interview/PreInterview";
import PostInterview from "../../components/interview/PostInterview";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CircularProgress from "material-ui/CircularProgress";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50
} from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    shadowColor: lightBlue500
  }
});

class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: "pre"
    };
    this.startInterview = this.startInterview.bind(this);
    this.endInterview = this.endInterview.bind(this);
  }

  async startInterview() {
    await this.setState({ progress: "in" });
  }

  async endInterview() {
    await this.setState({ progress: "post" });
  }

  async setProgress() {
    if (
      this.props.interviewId.interview_status === "applied" &&
      this.props.interviewId.count < 1
    )
      await this.setState({ progress: "pre" });
    else if (this.props.interviewId.interview_status === "given")
      await this.setState({ progress: "post" });
    else {
      await this.setState({ progress: "in" });
    }
  }

  renderMain() {
    if (this.state.progress === "pre")
      return <PreInterview startInterviewCallback={this.startInterview} />;
    else if (this.state.progress === "in")
      return <InInterview endInterviewCallback={this.endInterview} />;
    else if (this.state.progress === "post" || this.props.progress === "post")
      return <PostInterview />;
  }

  componentDidMount() {
    this.setProgress();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>{this.renderMain()}</div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ interviewId, progress }) {
  return { interviewId, progress };
}
export default connect(mapStateToProps, actions)(Interview);
