import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import centerFocusStrong from 'material-ui/svg-icons/image/center-focus-strong';
const style = {
  height: 230,
  width: 230,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
};
const prog = {
  margin: 10,
};

class PerPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 60,
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
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div style={{ margin: 15, marginLeft: 40 }}>
          <h4> Profile completion Percentile</h4>
          <CircularProgress
            mode="determinate"
            value={this.state.completed}
            size={200}
            thickness={5}
            style={prog}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default PerPaper;
