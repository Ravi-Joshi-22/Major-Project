import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/interview/";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { blue300, red300, indigo900, red900 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50
} from "material-ui/styles/colors";
import AppBar from "material-ui/AppBar";
import Timer from "./Timer.js";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import AvMicNone from "material-ui/svg-icons/av/mic-none";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    shadowColor: lightBlue500
  }
});

const styles = {
  largeIcon: {
    width: 60,
    height: 60
  },
  large: {
    width: 120,
    height: 120
  }
};

class InInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
      timerVar: 0
    };
    this.updateAnswer = this.updateAnswer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.timerEnd = this.timerEnd.bind(this);
  }

  async componentDidMount() {
    console.log(this.props.interviewId);
    if (this.props.interviewId) {
      await this.updateTrackId(this.props.interviewId._id);
      this.props.getQuestions(this.state.trackId);
    } else {
      this.props.getQuestions(this.state.trackId);
    }
  }

  async updateAnswer(e) {
    await this.setState({ answer: e.target.value });
  }

  updateTrackId(id) {
    this.setState({ trackId: id });
  }

  giveAnswer() {
    const responseObject = {
      openingTrackId: this.state.trackId,
      userAns: this.state.answer
    };
    this.setState({ answer: "", timerVar: 1 });
    this.props.giveAnswer(responseObject);
  }

  async resetTimer() {
    await this.setState({ timerVar: 0 });
  }

  async timerEnd() {
    await this.giveAnswer();
  }

  render() {
    if (this.props.progress === "post") {
      this.props.endInterviewCallback();
    }
    return (
      <div>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <div>
            <AppBar
              title="SmartHyre"
              iconElementRight={
                <div>
                  <Timer
                    endCallback={this.timerEnd}
                    timerVar={this.state.timerVar}
                    resetCallback={this.resetTimer}
                  />
                </div>
              }
              iconElementLeft={<div />}
              style={{ width: "114%", marginLeft: "-7%" }}
            />

            <div className="columns " style={{ marginTop: 40 }}>
              <div
                className="column is-6"
                style={{
                  borderRight: "2px solid",
                  height: "500px",
                  fontSize: "22px"
                }}
              >
                {this.props.questionName.question}
              </div>
              <div
                className="column is-6"
                style={{
                  borderLeft: "2px solid",
                  height: "500px",
                  fontSize: "22px"
                }}
              >
                <div className="field">
                  <label className="label">Answer</label>
                  <div className="control has-icons-left has-icons-right">
                    <textarea
                      ref="answerInput"
                      className="textarea"
                      type="text"
                      placeholder="Answer"
                      value={this.state.answer}
                      onChange={this.updateAnswer}
                      style={{ height: "300px" }}
                    />
                  </div>
                </div>
                <div className="columns " style={{ marginTop: 10 }}>
                  <div className="column is-9 " style={{ marginTop: -40 }}>
                    <IconButton
                      iconStyle={styles.largeIcon}
                      style={styles.large}
                    >
                      <AvMicNone />
                    </IconButton>
                  </div>
                  <div className="column is-3 ">
                    <RaisedButton
                      label="Submit"
                      primary={true}
                      style={{ margin: 12 }}
                      onClick={() => this.giveAnswer()}
                    />
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

function mapStateToProps({ interviewId, questionName, progress }) {
  return { interviewId, questionName, progress };
}
export default connect(mapStateToProps, actions)(InInterview);
