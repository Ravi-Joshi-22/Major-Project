import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/app';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
        await this.props.login(this.state);
        console.log(this.props.user.verification_status);
        switch (this.props.user.verification_status) {
            case 'in_process':
                this.props.changeCurrentStep(2);
                this.props.history.push('/companyRegister');
                break;
            case 'email_verified':
                this.props.changeCurrentStep(3);
                this.props.history.push('/companyRegister');
                break;
            case 'otp_verified':
                this.props.history.push('/dashboard');

        }
    }

    render() {
        return (
            <div>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                        <input ref="usernameInput" className="input" type="text" placeholder="Username" value={this.state.username} onChange={this.updateUsername} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input ref="passwordInput" className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword} />
                        <span className="icon is-small is-left">
                            <i className="fas fa-key"></i>
                        </span>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link is-rounded" onClick={this.authorize}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ user, currentStep }) {
    return { user, currentStep };
}
export default connect(mapStateToProps, actions)(withRouter(Login));

