import React from 'react';
import { connect } from 'react-redux';
import Payment from '../../components/companyDashboard/payment'

class CompanyDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderContent() {
        if (this.props.company) {
            return <div>YOUR CREDITS ARE:-- {this.props.company.credits}</div>;
        } else {
            return <div> YOUR CREDITS ARE:--- 0</div>;
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Payment />
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ company }) {
    return { company };
}
export default connect(mapStateToProps)(CompanyDashboard);
