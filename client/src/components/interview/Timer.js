import React from "react";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import { blue300, red300, indigo900, red900 } from "material-ui/styles/colors";

const styles = {
  chip: {
    margin: 4,
    fontSize: "27px"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: 120 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.restartTimer = this.restartTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar,
    seconds: this.props.timerTime });
    this.startTimer();
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  restartTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.props.endCallback();
    }
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <div style={styles.wrapper}>
            <Chip
              backgroundColor={
                this.state.time.m == 0 && this.state.time.s < 11
                  ? red300
                  : blue300
              }
              style={styles.chip}
            >
              <Avatar
                icon={<i className="far fa-clock" />}
                backgroundColor={
                  this.state.time.m == 0 && this.state.time.s < 11
                    ? red900
                    : indigo900
                }
              />
              {this.state.time.m} : {this.state.time.s}
            </Chip>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ timerTime }) {
  return { timerTime };
}
export default connect(mapStateToProps)(Timer);
