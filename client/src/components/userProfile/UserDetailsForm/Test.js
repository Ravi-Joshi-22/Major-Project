import React from 'react';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      score: '',
      date: '',
      currentModalClass: 'modal',
    };
    this.updateName = this.updateName.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updatedDate = this.updatedDate.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateName(e) {
    this.setState({ name: e.target.value });
  }
  updateScore(e) {
    if (e.target.value < 100) {
      this.setState({ score: e.target.value });
    }
  }
  updatedDate(e) {
    this.setState({ date: e.target.value });
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
      <div>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Test Details</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <div className="field">
                <label className="label">Test Name</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ex:Gate"
                    required
                    value={this.state.name}
                    onChange={this.updateName}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-envelope-open" />
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label"> Test Score Percentile</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="number"
                    placeholder="Should be less than 100"
                    required
                    value={this.state.score}
                    onChange={this.updateScore}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-id-card" />
                  </span>
                </div>
              </div>

              <div className="field " style={{ width: '100%' }}>
                <label className="label">Test Date</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="date"
                    value={this.state.date}
                    onChange={this.updatedDate}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-calendar" />
                  </span>
                </div>
              </div>
            </section>
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
        <a
          class="button is-black is-inverted  is-hovered"
          onClick={this.renderModal}
        >
          {' '}
          +Add Test{' '}
        </a>
      </div>
    );
  }
}
