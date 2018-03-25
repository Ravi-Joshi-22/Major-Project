import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/editor/mode-edit';
export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      currentModalClass: 'modal',
      rate: 'Intermediate',
    };
    this.updateSkills = this.updateSkills.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateSkills(e) {
    this.setState({ name: e.target.value });
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
              <p class="modal-card-title">Skills Addition</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <div className="field">
                <label className="label">Skills</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    ref="nameInput"
                    className="input"
                    type="text"
                    placeholder="Skills"
                    value={this.state.name}
                    onChange={this.updateSkills}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-tags" />
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
        <FlatButton
          label="ADD MORE SKILLS"
          primary={true}
          fullWidth={true}
          icon={<AddIcon />}
          onClick={this.renderModal}
        />
      </div>
    );
  }
}
