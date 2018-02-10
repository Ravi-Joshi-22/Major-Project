import React from "react";

export default class Interviewee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      phone: "",
      email: "",
      password: "",
      cPassword: "",
      currentModalClass: "",
      role: "interviewee"
    };
    this.setState({currentModalClass : this.props.currentModalClass});
    this.updateName = this.updateName.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePwd = this.updatePwd.bind(this);
    this.updateCPwd = this.updateCPwd.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateName(e) {
    this.setState({ fName: e.target.value });
  }

  updatePhone(e) {
    if (e.target.value < 10000000000) {
      this.setState({ phone: e.target.value });
    }
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
    var email = e.target.value;
    if (
      String(email).includes("@") &&
      String(email).includes(".") &&
      String(email).length > 5
    ) {
      this.refs.emailInput.className = "input is-success";
    } else {
      this.refs.emailInput.className = "input is-danger";
    }
  }

  updatePwd(e) {
    this.setState({ password: e.target.value });
    var password = e.target.value;
    if (
      /[a-z]/.test(String(password)) &&
      /[A-Z]/.test(String(password)) &&
      /[0-9]/.test(String(password)) &&
      String(password).length > 7
    ) {
      this.refs.passwordInput.className = "input is-success";
    } else {
      this.refs.passwordInput.className = "input is-danger";
    }
  }

  updateCPwd(e) {
    this.setState({ cPassword: e.target.value });
    const { cPassword, password } = this.state;
    if (e.target.value === password) {
      this.refs.cPasswordCheck.className = "icon is-small is-right";
      this.refs.cPasswordInput.className = "input is-success";
    } else {
      this.refs.cPasswordCheck.className = "icon is-small is-right hidden";
      this.refs.cPasswordInput.className = "input is-danger";
    }
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
    this.props.userCB(this.state);
  }

  render() {
    return (
      (
        <div>
          <div className={this.state.currentModalClass}>
            <div class="modal-background" />
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Personal Details</p>
                <button
                  class="delete"
                  aria-label="close"
                  onClick={this.renderModal}
                />
              </header>
              <section class="modal-card-body">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="nameInput"
                      className="input"
                      type="text"
                      placeholder="Name"
                      required
                      value={this.state.fName}
                      onChange={this.updateName}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Phone</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="phoneInput"
                      className="input"
                      type="number"
                      placeholder="Phone"
                      required
                      value={this.state.phone}
                      onChange={this.updatePhone}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">E-mail</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="emailInput"
                      className="input"
                      type="email"
                      placeholder="E-mail"
                      required
                      value={this.state.email}
                      onChange={this.updateEmail}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="passwordInput"
                      className="input"
                      type="password"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={this.updatePwd}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-key" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      ref="cPasswordInput"
                      className="input"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={this.state.cPassword}
                      onChange={this.updateCPwd}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-key" />
                    </span>
                    <span
                      ref="cPasswordCheck"
                      className="icon is-small is-right hidden"
                    >
                      <i className="fas fa-check" />
                    </span>
                  </div>
                </div>
                <p>
                  Password should have minimum 8 charaters and must include
                  atleast one UPPERCASE character, atleast one lowercase
                  character and atleast one number.
                </p>

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
              </section>
            </div>
          </div>
          <a
            class="button is-black is-inverted  is-hovered"
            onClick={this.renderModal}
          >
            {" "}
            +About Me{" "}
          </a>
        </div>
      )
    );
  }
}
