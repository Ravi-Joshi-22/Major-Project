import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../../actions/company';

//token receive callback
class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="SmartHyre"
                description="$50 for 10 openings"
                amount={5000}
                token={token => this.props.handleToken(token)}
                stripeKey='pk_test_kvIqGQihVs5DqxWtISyWbbLD'
            >
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);
