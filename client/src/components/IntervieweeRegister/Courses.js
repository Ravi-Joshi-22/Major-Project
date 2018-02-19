import React from "react";

export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: "",
      description: "",
      currentModalClass: "modal"
    };
    this.updateName = this.updateName.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.updatedDescription = this.updatedDescription.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateName(e) {
    this.setState({ name: e.target.value });
  }
  updateNumber(e) {
    this.setState({ number: e.target.value });
  }
  updatedDescription(e) {
    this.setState({ description: e.target.value });
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
    this.props.coursesCB(this.state);
  }

  render() {
    return (
      <div
        className="card"
        style={{ width: '80%', maxWidth: 800, margin: 'auto', padding: 50 }}
      >
              <div className="field">
                <label className="label">Course Name</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Ex:Full Stack Developer"
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
                <label className="label"> Course Number</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="number"
                    placeholder="Ex:Course number"
                    required
                    value={this.state.number}
                    onChange={this.updateNumber}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-id-card" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control has-icons-left has-icons-right">
                  <textarea
                    class="textarea is-hovered"
                    type="text"
                    placeholder="Course Description"
                    value={this.state.description}
                    onChange={this.updatedDescription}
                  />
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
