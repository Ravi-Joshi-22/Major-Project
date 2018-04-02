import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
const prog = {
  margin: 10,
};

class PerPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
    };
  }
  /* componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
*/
  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      //this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    const myStyle = {
      parentStyle: {
        position: 'relative',
      },
      childStyle: {
        position: 'absolute',
        top: 82,
        left: 52,
      },
    };
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div style={{ margin: 15, marginLeft: 40 }}>
          <h4> Profile completion Percentile</h4>
          <div style={myStyle.parentStyle}>
            <CircularProgress
              mode="determinate"
              value={this.props.percent}
              size={200}
              thickness={5}
              style={prog}
            />
            <div style={myStyle.childStyle}>
              <h1 style={{ fontSize: 45 }}>{this.props.percent}%</h1>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PerPaper;
