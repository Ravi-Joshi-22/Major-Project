import React from 'react';
import { connect } from 'react-redux';
import { clearError } from '../../actions/app';

import ErrorBox from './errorbox';

class ErrorBoxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.closeError = this.closeError.bind(this);
  }

  closeError() {
    const { dispatch } = this.props;
    dispatch(clearError());
  }

  render() {
    const { errorStore } = this.props;
    return (
      <ErrorBox errorStore={errorStore} closeErrorFunction={this.closeError} />
    );
  }
}

function mapStateToProps(state) {
  return { errorStore: state.error };
}

export default connect(mapStateToProps)(ErrorBoxContainer);
