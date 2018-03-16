import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Internship from '../../IntervieweeRegister/Internship';
import Jobs from '../../IntervieweeRegister/Jobs';

export default class ExpModal extends React.Component {
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
              <p class="modal-card-title">Add Experience</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <Internship />
              <Jobs />
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
