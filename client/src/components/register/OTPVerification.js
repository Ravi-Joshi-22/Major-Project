import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/app';
import axios from 'axios';

class OTPVerification extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            otp: '',
        };
        this.updateOtp = this.updateOtp.bind(this);
        this.requestOtp = this.requestOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
    }

    updateOtp(e) {
        this.setState({ otp: e.target.value });
    }

    async requestOtp() {
        const userId = this.props.user._id;
        await axios.get(`/smarthyre/api/v1/app/requestOTP?id=${userId}`);
    }

    async verifyOtp() {
        this.props.verifyOTP(this.props.user._id, this.state.otp, this.props.history);
    }

    render() {
        return (
            <div className="card" style={{ width: '80%', maxWidth: 500, margin: 'auto', padding: 100, textAlign: "center" }}>
                <div className="field">
                    <label className="label">OTP Verification</label>
                    <br />
                    <div className="control">
                        <input ref="nameInput" className="input" type="text" placeholder="OTP" value={this.state.otp} onChange={this.updateOtp} style={{ margin: 'auto', textAlign: "center" }} />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control" style={{ margin: "auto" }}>
                        <button className="button is-link is-rounded" onClick={this.requestOtp}>Request</button>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control" style={{ margin: "auto" }}>
                        <button className="button is-link is-rounded" onClick={this.verifyOtp}>Verify</button>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}
export default connect(mapStateToProps, actions)(withRouter(OTPVerification));

