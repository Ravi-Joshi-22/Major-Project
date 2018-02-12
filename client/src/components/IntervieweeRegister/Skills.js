import React from "react";
export default class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      currentModalClass: "modal",
      rate: "Intermediate"
    };
    this.updateSkills = this.updateSkills.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateSkills(e) {
    this.setState({ name: e.target.value });
  }
  async renderModal() {
    if (this.state.currentModalClass === "modal") {
      await this.setState({ currentModalClass: "modal is-active" });
    } else {
      await this.setState({ currentModalClass: "modal" });
    }
  }
  async submit() {
    await this.setState({ currentModalClass: "modal" });
    this.props.skillCB(this.state);
  }

  render() {
    return (
      <div
        className="card"
        style={{ width: '80%', maxWidth: 800, margin: 'auto', padding: 50 }}
      >
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
    
              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-link is-rounded"
                    onClick={this.submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
    );
  }
}
