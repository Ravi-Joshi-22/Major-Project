import React from 'react';

export default class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        console.log("2" +this.props.companyData.city);
        return (
            <div>
                <p className="is-size-3	has-text-weight-semibold">{this.props.companyData.name}</p>
                <div className="columns">
                    <div className="column">
                        {this.props.companyData.cin}
                    </div>
                    <div className="column">
                        <img src={this.props.companyData.logo} alt={this.props.companyData.name} />
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        {this.props.companyData.address.line}<br/>
                        {this.props.companyData.address.city}<br/>
                        {this.props.companyData.address.state} {"   "}
                        {this.props.companyData.address.pin}
                    </div>
                    <div className="column">
                        {this.props.companyData.phone}<br/>
                        {this.props.companyData.website}
                    </div>
                </div>
            </div>
        );
    }
}

