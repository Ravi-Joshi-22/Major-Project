import React from "react";

export default class Certification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      authority: "",
      lic_number: "",
      url: "",
      currentModalClass: "modal"
    };
    this.updateName = this.updateName.bind(this);
    this.updateAuthority = this.updateAuthority.bind(this);
    this.updatedLic_no = this.updatedLic_no.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.submit = this.submit.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }
  updateName(e) {
    this.setState({ name: e.target.value });
  }
  updateAuthority(e) {
    this.setState({ authority: e.target.value });
  }
  updatedLic_no(e) {
    this.setState({ lic_number: e.target.value });
  }
  updateUrl(e) {
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
    this.props.certiCB(this.state);
  }

  render() {
    return (
      <div
        className="card"
        style={{ width: '80%', maxWidth: 800, margin: 'auto', padding: 50 }}
      >
              <div className="field">
                <label className="label">Certificate Name</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="text"
                    placeholder="NGO"
                    required
                    value={this.state.name}
                    onChange={this.updateName}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-certificate" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Authority</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="text"
                    placeholder="Organization"
                    required
                    value={this.state.authority}
                    onChange={this.updateAuthority}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-university" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label"> LIC_NO</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="number"
                    placeholder=" Certificate LIC_NO"
                    required
                    value={this.state.lic_number}
                    onChange={this.updatedLic_no}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-id-card" />
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Certificate URL</label>
                <div className="control has-icons-left ">
                  <input
                    className="input"
                    type="url"
                    pattern="https?://.+"
                    placeholder=" http://www.example.com"
                    required
                    value={this.state.url}
                    onChange={this.updateUrl}
                  />
                  <span className="icon is-small is-left">
                    <i class="fa fa-envelope-open" />
                  </span>
                </div>
              </div>
              <br />
    
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
