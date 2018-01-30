import React from "react";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      start_date: "",
      end_date: "",
      currently_working: "",
      description: "",
      url: "",
      currentModalClass: "modal"
    };
    this.updateTitle = this.updateTitle.bind(this);
    this.updateStart = this.updateStart.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.updateOngoing = this.updateOngoing.bind(this);
    this.updatedDescription = this.updatedDescription.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  updateTitle(e) {
    this.setState({ title: e.target.value });
  }
  updateStart(e) {
    this.setState({ start_date: e.target.value });
  }

  updateEnd(e) {
    this.setState({ end_date: e.target.value });
  }
  updateOngoing(e) {
    this.setState({ currently_working: e.target.value });
  }
  updatedDescription(e) {
    this.setState({ description: e.target.value });
  }
  updateLink(e) {
    this.setState({ url: e.target.value });
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
    this.props.projectCB(this.state);
  }
  render() {
    return (
      <div>
        <div className={this.state.currentModalClass}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Project Details</p>
              <button
                class="delete"
                aria-label="close"
                onClick={this.renderModal}
              />
            </header>
            <section class="modal-card-body">
              <div className="field">
                <label className="label">Project Title</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Smart Hyre"
                    required
                    value={this.state.title}
                    onChange={this.updateTitle}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-address-book" />
                  </span>
                </div>
              </div>

              <label class="label">Project Duration</label>
              <div style={{ display: "flex" }}>
                <div class="field" style={{ width: "47%", marginRight: "5%" }}>
                  <label class="label">Start date</label>
                  <p class="control has-icons-left ">
                    <input
                      class="input"
                      type="date"
                      required
                      value={this.state.start_date}
                      onChange={this.updateStart}
                    />

                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar" />
                    </span>
                  </p>
                </div>
                <div class="field" style={{ width: "50%" }}>
                  <label class="label">End day</label>
                  <p class="control has-icons-left ">
                    <input
                      class="input"
                      type="date"
                      required
                      value={this.state.end_date}
                      onChange={this.updateEnd}
                    />

                    <span class="icon is-small is-left">
                      <i class="fa fa-calendar" />
                    </span>
                  </p>
                </div>
              </div>
              <label class="checkbox">
                <input
                  type="checkbox"
                  value={this.state.currently_working}
                  onChange={this.updateOngoing}
                />
                Currently ongoing
              </label>
              <div className="field">
                <label className="label">Project Description</label>
                <div className="control has-icons-left has-icons-right">
                  <textarea
                    class="textarea is-hovered"
                    type="text"
                    placeholder="Project Description"
                    value={this.state.description}
                    onChange={this.updatedDescription}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Projet Link</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="url"
                    pattern="https?://.+"
                    placeholder="https://www.example.com"
                    required
                    value={this.state.url}
                    onChange={this.updateLink}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-book" />
                  </span>
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
          +Add Project{" "}
        </a>
      </div>
    );
  }
}
