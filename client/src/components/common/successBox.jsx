import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { hideSuccessBox } from '../../actions/app';


class SuccessBox extends React.Component {
  constructor(props) {
    super(props);

    this.closeSuccessBox = this.closeSuccessBox.bind(this);
  }

  closeSuccessBox() {
    const { dispatch } = this.props;
    dispatch(hideSuccessBox());
  }

  render() {
    const { successBox } = this.props;
    return (
      <MuiThemeProvider>
      <Snackbar
        open={successBox.isVisible}
        message={JSON.stringify(successBox.msg)}
        autoHideDuration={4000}
        onRequestClose={this.closeSuccessBox}
      />
    </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { successBox: state.successBox };
}

export default connect(mapStateToProps)(SuccessBox);