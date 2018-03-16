import React from 'react';
import Graduation from '../../IntervieweeRegister/Graduation';
import SeniorSecondary from '../../IntervieweeRegister/SeniorSecondary';
import Secondary from '../../IntervieweeRegister/Secondary';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
export default class EduModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModalClass: 'modal',
    };
    this.renderModal = this.renderModal.bind(this);
  }
  async renderModal() {
    if (this.state.currentModalClass === 'modal') {
      await this.setState({ currentModalClass: 'modal is-active' });
    } else {
      await this.setState({ currentModalClass: 'modal' });
    }
  }
  render() {
    return (
      <div>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Add Education Details</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <Graduation />
              <SeniorSecondary />
              <Secondary />
            </section>
          </div>
        </div>
        <FloatingActionButton mini={true} onClick={this.renderModal}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}
