import React from 'react';

export default class AdminValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
        };
        this.updateOtp = this.updateOtp.bind(this);
    }

    updateOtp(e) {
        this.setState({otp: e.target.value});
    }
    
    registerCall() {
        
    }

    render() {
        return (
            <div className="card" style={{ width: '80%', maxWidth: 500, margin: 'auto', padding: 100, textAlign: "center" }}>
                Sorry, Admin has not yet validated your account.
            </div>
        );
    }
}