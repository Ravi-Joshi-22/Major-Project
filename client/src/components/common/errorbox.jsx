import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { Alert } from 'reactstrap';

export default function ErrorBox(props) {
  const { closeErrorFunction } = props;
  const { error, isError } = props.errorStore;
  return (
    <MuiThemeProvider>
      <Snackbar
        open={isError}
        message={JSON.stringify(error)}
        autoHideDuration={4000}
        onRequestClose={closeErrorFunction}
      />
    </MuiThemeProvider>
  );
}
