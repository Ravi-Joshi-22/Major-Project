import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { blue300, red300, indigo900, red900 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Card, CardTitle, CardText } from "material-ui/Card";
import Divider from "material-ui/Divider";
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50
} from "material-ui/styles/colors";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    shadowColor: lightBlue500
  }
});

class PreInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = {};
    return (
      <div>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <div>
            <AppBar
              title="SmartHyre"
              iconElementLeft={<div />}
              style={{ width: "114%", marginLeft: "-7%" }}
            />
            <div>
              <Card
                style={{
                  maxWidth: 900,
                  padding: 10,
                  margin: "auto",
                  marginTop: 30,
                  textAlign: "center"
                }}
              >
                <CardTitle title="INTRODUCTION" />
              </Card>
              <Card
                style={{
                  maxWidth: 900,
                  padding: 10,
                  margin: "auto",
                  marginTop: 30
                }}
              >
                <CardText style={{ padding: 20 }}>
                  <ul style={{ listStyleType: "square" }}>
                    <li>
                      Ensure that your system is{" "}
                      <font color={teal300}>not affected</font> by
                      malware/adware.
                    </li><br/>
                    <li>
                      Please <font color={teal300}>disable any add-ons</font>{" "}
                      installed on your browser as they might disrupt the test
                      activity.
                    </li><br/>
                    <li>
                      Please <font color={teal300}>do not refresh</font> your
                      page while taking up test as it will disrupt the test
                      activity.
                    </li><br/>
                    <li>
                      Ensure that there are{" "}
                      <font color={teal300}>no frequent connection drops</font>.
                    </li><br/>
                    <li>
                      The test window will{" "}
                      <font color={teal300}>automatically close</font> upon
                      successful completion of the test.
                    </li><br/>
                    <li>
                      Make sure your{" "}
                      <font color={teal300}>browser is updated</font>.
                    </li><br/>
                    <li>
                      We recommend using{" "}
                      <font color={teal300}>Google Chrome</font>.
                    </li><br/>
                  </ul>
                </CardText>
              </Card>
              <Card
                style={{
                  maxWidth: 900,
                  padding: 10,
                  margin: "auto",
                  marginTop: 30
                }}
              >
                <CardTitle title="SMARTHYRE HONOR CODE" />
                <Divider />
                <CardText style={{ padding: 20 }}>
                  Exhibiting high standards of professionalism, honesty and
                  integrity in line with code of conduct adopted at SmartHyre, I
                  commit to the following:
                  <br />
                  <br />
                  <ol>
                    <li>
                      My answers to the test and further assessment of SmartHyre
                      will be my own work.
                    </li>
                    <br />
                    <li>
                      I will not make solutions or answers to the tests and
                      other assessments available to anyone else by means of
                      postings on social media, mass mailers, online forums,
                      college portals etc. This includes both solutions written
                      by me or provided by SmartHyre Team.
                    </li>
                    <br />
                    <li>
                      I will not engage in any form of activities that will
                      dishonestly improve my results or dishonestly improve/hurt
                      the results of others.
                    </li>
                    <br />
                  </ol>
                  <br />
                </CardText>
              </Card>
              <Card
                style={{
                  maxWidth: 900,
                  padding: 10,
                  margin: "auto",
                  marginTop: 30
                }}
              >
                <CardTitle title="INTERVIEW INSTRUCTIONS" />
                <Divider />
                <CardText style={{ padding: 20 }}>
                  <ol>
                    <li>
                      Each question in the interview needs to be answered within
                      120 seconds.
                    </li>
                    <br/>
                    <li>
                      You will have to answer questions in a sequential manner,
                      you will not be able to navigate across questions.
                    </li>
                    <br/>
                    <li> Answers once submitted cannot be changed</li><br/>
                    <li>
                      You are allowed to take up one interview at a time, not
                      abiding by this rule would result in interview session
                      loss.
                    </li><br/>
                    <li> You have a single attempt to complete the quiz.</li><br/>
                    <li>
                      In case of power failure or shut down, your current
                      progress will be saved and next question will be appeared
                      automatically when reopened.
                    </li><br/>
                    <li> No of maximum allowed breaks : 2</li><br/>
                  </ol>
                  <br/>
                  <centre>
                    <RaisedButton
                      label="START THE INTERVIEW"
                      primary={true}
                      fullWidth={true}
                      style={{
                        display: "block",
                        margin: "auto",
                        maxWidth: 100
                      }}
                      onClick={() => this.props.startInterviewCallback()}
                    />
                  </centre>
                </CardText>
              </Card>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default (PreInterview);
