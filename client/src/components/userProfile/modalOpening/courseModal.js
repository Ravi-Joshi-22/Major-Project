import React from 'react';
import Courses from '../../IntervieweeRegister/Courses';
import Certification from '../../IntervieweeRegister/Certification';
import Test from '../../IntervieweeRegister/Test';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
export default class CourseModal extends React.Component {
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
              <p class="modal-card-title">Add Additional Details</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <Courses />
              <Certification />
              <Test />
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
