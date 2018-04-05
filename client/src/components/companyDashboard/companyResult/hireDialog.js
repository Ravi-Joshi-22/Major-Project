import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import HireIcon from 'material-ui/svg-icons/action/work';

class HireCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModalClass: 'modal',
    };
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  async renderModal() {
    if (this.state.currentModalClass === 'modal') {
      await this.setState({ currentModalClass: 'modal is-active' });
    } else {
      await this.setState({ currentModalClass: 'modal' });
    }
  }
  async submit() {
    await this.setState({ currentModalClass: 'modal' });
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">
                Enter the number of candidates to hire!!
              </p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body" />
            <footer class="modal-card-foot">
              <button
                class="button is-right is-primary  is-rounded"
                onClick={this.submit}
              >
                Save changes
              </button>
            </footer>
          </div>
        </div>
        <RaisedButton
          label="HIRE"
          primary={true}
          icon={<HireIcon />}
          onClick={this.renderModal}
        />
      </MuiThemeProvider>
    );
  }
}

export default HireCard;
