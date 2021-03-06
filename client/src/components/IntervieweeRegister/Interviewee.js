import React from 'react';

export default class Interviewee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: '',
      phone: '',
      email: '',
      password: '',
      cPassword: '',
      role: 'interviewee',
    };
    this.updateName = this.updateName.bind(this);
    this.updatePhone = this.updatePhone.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePwd = this.updatePwd.bind(this);
    this.updateCPwd = this.updateCPwd.bind(this);
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
      String(email).includes('@') &&
      String(email).includes('.') &&
      String(email).length > 5
    ) {
      this.refs.emailInput.className = 'input is-success';
    } else {
      this.refs.emailInput.className = 'input is-danger';
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
      this.refs.passwordInput.className = 'input is-success';
    } else {
      this.refs.passwordInput.className = 'input is-danger';
    }
  }

  updateCPwd(e) {
    this.setState({ cPassword: e.target.value });
    const { cPassword, password } = this.state;
    if (e.target.value === password) {
      this.refs.cPasswordCheck.className = 'icon is-small is-right';
      this.refs.cPasswordInput.className = 'input is-success';
    } else {
      this.refs.cPasswordCheck.className = 'icon is-small is-right hidden';
      this.refs.cPasswordInput.className = 'input is-danger';
    }
  }

  async submit() {
    if (this.state.fName.length > 0) {
      this.refs.fNameInput.className = 'input';
      var phone = this.state.phone;
      if (phone > 1000000000) {
        this.refs.phoneInput.className = 'input';
        var email = this.state.email;
        if (
          String(email).includes('@') &&
          String(email).includes('.') &&
          String(email).length > 5
        ) {
          this.refs.emailInput.className = 'input';
          var pass = this.state.password;
          if (
            /[a-z]/.test(String(pass)) &&
            /[A-Z]/.test(String(pass)) &&
            /[0-9]/.test(String(pass)) &&
            String(pass).length > 7
          ) {
            this.refs.passwordInput.className = 'input';
            if (this.state.cPassword === this.state.password) {
              this.refs.cPasswordInput.className = 'input';
              this.refs.submitButton.innerHTML = 'Loading...';
              this.props.userCB(this.state);
            } else {
              this.refs.cPasswordInput.className = 'input is-danger';
            }
          } else {
            this.refs.passwordInput.className = 'input is-danger';
          }
        } else {
          this.refs.emailInput.className = 'input is-danger';
        }
      } else {
        this.refs.phoneInput.className = 'input is-danger';
      }
    } else {
      this.refs.fNameInput.className = 'input is-danger';
    }
  }

  render() {
    return (
      <div
        className="card"
        style={{ width: '80%', maxWidth: 800, margin: 'auto', padding: 50 }}
      >
        <div className="field">
          <label className="label">Name</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="fNameInput"
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
          Password should have minimum 8 charaters and must include atleast one
          UPPERCASE character, atleast one lowercase character and atleast one
          number.
        </p>
        <br />

        <div className="field is-grouped">
          <div className="control">
            <button
              ref="submitButton"
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
