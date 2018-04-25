import React from "react";
import CompanyDetails from "./MainArea/CompanyDetails";
import UsersDetails from "./MainArea/UsersDetails";
import Reports from "./MainArea/Reports";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

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

  graphData() {
    let data = [
      {
        name: "Last Month",
        openings: this.props.companyDash.no_of_openings_created_in_last_month
      },
      {
        name: "This Month",
        openings: this.props.companyDash.no_of_openings_created_in_running_month
      },
      {
        name: "Upcoming",
        openings: this.props.companyDash.no_of_upcoming_openings
      }
    ];
    return data;
  }

  usersData() {
    let usersDetails = this.props.companyDash.users;
    return usersDetails;
  }

  render() {
    console.log(this.props.companyDash);
    return (
      <div>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child notification box">
                    <CompanyDetails companyData={this.companyData()} />
                  </article>
                  <article className="tile is-child notification box">
                    <div className="columns">
                      <div className="column">
                        <p className="title">Current</p>
                        <p className="subtitle">Openings:</p>
                      </div>
                      <div className="column">
                        <p className="subtitle">
                          <br />
                          {this.props.companyDash.no_of_current_openings}{" "}
                          {this.props.companyDash.no_of_current_openings == 1
                            ? "Opening"
                            : "Openings"}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child notification box">
                    <p className="title">Statistics</p>
                    <AreaChart
                      width={450}
                      height={300}
                      data={this.graphData()}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="openings"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                    </AreaChart>
                  </article>
                </div>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification box">
                  <p className="title">
                    <UsersDetails
                      usersData={this.usersData()}
                      style={{ display: "inline" }}
                    />
                  </p>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification box">
                <div className="content">
                  <p className="title">Recent Reports</p>
                  <Reports companyDash={this.props.companyDash} />
                </div>
              </article>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
