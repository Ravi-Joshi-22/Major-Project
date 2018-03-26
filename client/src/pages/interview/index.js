import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/company";
import "./index.css";
import BusyIndicator from "../../components/common/busyIndicator";
import Timer from "../../components/interview/Timer.js";
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
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from 'material-ui/IconButton';
import AvMicNone from 'material-ui/svg-icons/av/mic-none';

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
    height: 60,
  },
  large: {
    width: 120,
    height: 120,
  },
};

class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    };
    this.updateAnswer = this.updateAnswer.bind(this);
    this.timerEnd = this.timerEnd.bind(this);
  }

  async updateAnswer(e) {
    await this.setState({ answer: e.target.value });
  }

  timerEnd() {}

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <AppBar
              title="SmartHyre"
              iconElementRight={
                <div>
                  <Timer endCallback={this.timerEnd} />
                </div>
              }
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
                Question
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
                  <div className="column is-9 "  style={{ marginTop: -40 }}>
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

function mapStateToProps({}) {
  return {};
}
export default connect(mapStateToProps, actions)(Interview);
