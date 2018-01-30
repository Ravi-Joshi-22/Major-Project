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
      <div>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Courses Done</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
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
            </section>
            <footer class="modal-card-foot">
              <button
                class="button is-primary is-rounded"
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
          {" "}
          +Add Courses{" "}
        </a>
      </div>
    );
  }
}
