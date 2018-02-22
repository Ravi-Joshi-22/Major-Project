import React from "react";
import CompanyDetails from "./MainArea/CompanyDetails";
import UsersDetails from "./MainArea/UsersDetails";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  companyData() {
    let companyDetails = {
      name: this.props.companyDash.company_name,
      cin: this.props.companyDash.company_cin,
      phone: this.props.companyDash.company_phone,
      website: this.props.companyDash.company_website,
      logo: this.props.companyDash.company_logo,
      address: {
        country: this.props.companyDash.address.country,
        line: this.props.companyDash.address.address_line,
        city: this.props.companyDash.address.city,
        pin: this.props.companyDash.address.pin,
        state: this.props.companyDash.address.state
      }
    };
    return companyDetails;
  }

  usersData() {
    let usersDetails = this.props.companyDash.users;
    return usersDetails;
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification box">
                    <CompanyDetails companyData={this.companyData()} />
                  </article>
                  <article className="tile is-child notification box">
                    <p className="title">Current</p>
                    <p className="subtitle">Openings</p>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification box">
                    <p className="title">Unknown</p>
                    <p className="subtitle">Graph</p>
                    <figure className="image is-4by3">
                      <img src="./Assets/graph.png" />
                    </figure>
                  </article>
                </div>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification box">
                  <p className="title">
                    <UsersDetails usersData={this.usersData()} style={{ display: "inline" }}/>
                  </p>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification box">
                <div className="content">
                  <p className="title">Recent</p>
                  <p className="subtitle">Reports</p>
                  <div className="content" />
                </div>
              </article>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
