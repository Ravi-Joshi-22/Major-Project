import React from "react";
import CompanyDetails from "./MainArea/CompanyDetails";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";

export default class MainArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  companyData() {
    let companyDetails = {
      name: this.props.dashData.name,
      cin: this.props.dashData.cin,
      phone: this.props.dashData.phone,
      website: this.props.dashData.website,
      logo: this.props.dashData.logo,
      country: this.props.dashData.country,
      line: this.props.dashData.line,
      city: this.props.dashData.city,
      pin: this.props.dashData.pin,
      state: this.props.dashData.state
    };
    return companyDetails;
  }

  render() {
    const styles = {
      largeIcon: {
        width: 60,
        height: 60
      },
      large: {
        width: 120,
        height: 120,
        padding: 30
      }
    };
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
                    Users
                    <IconButton
                      style={styles.medium}
                      iconStyle={styles.mediumIcon}
                      tooltip="user1"
                    >
                        <Avatar src="./Assets/Employee.svg" size={30} />
                    </IconButton>
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
