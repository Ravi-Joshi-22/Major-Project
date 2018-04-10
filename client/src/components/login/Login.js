import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/app";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitButton: ""
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.authorize = this.authorize.bind(this);
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  async authorize() {
    if (this.state.username.length > 0) {
      this.refs.usernameInput.className = "input";
      if (this.state.password.length > 0) {
        this.refs.passwordInput.className = "input";

        await this.props.login(this.state);
        if (
          this.props.auth &&
          (this.props.auth.role === "company_head" ||
            this.props.auth.role === "company_user")
        ) {
          switch (this.props.auth.verification_status) {
            case "in_process":
              this.props.changeCurrentStep(2);
              this.props.history.push("/companyRegister");
              break;
            case "email_verified":
              this.props.changeCurrentStep(3);
              this.props.history.push("/companyRegister");
              break;
            case "otp_verified":
              this.props.history.push("/companyDashboard");
              break;
            default:
              this.props.history.push("/");
          }
        } else if (this.props.auth && this.props.auth.role === "interviewee") {
          switch (this.props.auth.verification_status) {
            case "in_process":
              this.props.changeCurrentStep(3);
              this.props.history.push("/intervieweeRegister");
              break;
            case "email_verified":
              this.props.changeCurrentStep(4);
              this.props.history.push("/intervieweeRegister");
              break;
            case "otp_verified":
              this.props.history.push("/userDashboard");
              break;
            default:
              this.props.history.push("/");
          }
        }
      } else {
        this.refs.passwordInput.className = "input is-danger";
      }
    } else {
      this.refs.usernameInput.className = "input is-danger";
    }
  }

  render() {
    console.log(this.props.auth);
    return (
      <div>
        <div className="field">
          <label className="label">Username</label>
          <div className="control has-icons-left has-icons-right">
            <input
              ref="usernameInput"
              className="input"
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.updateUsername}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
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
              value={this.state.password}
              onChange={this.updatePassword}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-key" />
            </span>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              ref="submitButton"
              className="button is-link is-rounded"
              onClick={this.authorize}
              disabled={this.state.submitButton}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, currentStep }) {
  return { auth, currentStep };
}
export default connect(mapStateToProps, actions)(withRouter(Login));
