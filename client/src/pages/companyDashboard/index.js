import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/company";
import "./index.css";
import BusyIndicator from '../../components/common/busyIndicator';
import MainArea from "../../components/companyDashboard/MainArea";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavDrawer from "../../components/companyDashboard/NavDrawer";
import InterviewOpening from "../../components/companyDashboard/DrawerArea/InterviewOpening";
import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import HamburgerIcon from "material-ui/svg-icons/navigation/menu";
import AppBar from "material-ui/AppBar";
import Payment from "../../components/companyDashboard/payment";
import Avatar from "material-ui/Avatar";

class CompanyDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openingForm = this.openingForm.bind(this);
    this.renderMain = this.renderMain.bind(this);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  renderContents() {
    if (this.props.company) {
      return this.props.company.credits;
    } else {
      return this.props.credits;
    }
  }

  async openingForm() {
    const { showOpeningModal, hideOpeningModal } = this.props;
    if (this.props.modals.companyOpeningModal === 'modal') {
      this.handleToggle();
      showOpeningModal();
    } else {
      hideOpeningModal();
    }
  }

  async componentDidMount() {
    await this.props.fetchDash();
  }

  renderTitle() {
    if (this.props.companyDash) {
      return this.props.companyDash.credits;
    } else {
      return 0;
    }
  }

  renderMain() {
    if (this.props.companyDash) {
      return this.props.companyDash;
    } else {
      let companyDetails = {
        name: "",
        cin: "",
        phone: "",
        website: "",
        logo: "",
        address: {
          country: "",
          line: "",
          city: "",
          pin: "",
          state: ""
        },
        users: [
          {
            role: "",
            first_name: "",
            last_name: "",
            phone: "",
            email: ""
          }
        ]
      };
      return companyDetails;
    }
  }

  render() {
    const contentStyle = {
      marginTop: 50
    };
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title="SmartHyre"
              iconElementLeft={
                <IconButton>
                  <HamburgerIcon />
                </IconButton>
              }
              iconElementRight={
                <div
                  className="control columns"
                  style={{ margin: "auto 15px auto 0" }}
                >
                  <div className="column-8">
                    <span>
                      <span
                        style={{
                          color: "#fff",
                          fontSize: 27,
                          marginTop: "auto",
                        }}
                      >
                        <img src="./Assets/coin.svg" style={{height: 20}}/> {this.renderTitle()}{" "}
                      </span>
                      <Payment />
                    </span>
                  </div>
                  <div className="navbar-item has-dropdown is-hoverable column-4">
                    <a className="navbar-link" href="#">
                      <Avatar src="./Assets/Employee.svg" size={30} />
                    </a>
                    <div className="navbar-dropdown">
                      <a className="navbar-item" href="#">
                        Profile
                      </a>
                      <hr className="navbar-divider" />
                      <a className="navbar-item is-active" href="#">
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              }
              onLeftIconButtonClick={this.handleToggle}
              onTitleClick={() => {
                this.props.homeCallback();
              }}
              style={{ width: "114%", marginLeft: "-7%" }}
            />
            <div style={contentStyle}>
              <InterviewOpening
                currentModalClass={this.state.currentModalClass}
                openingCallback={this.openingForm}
              />
              <Drawer
                docked={false}
                width={300}
                open={this.state.open}
                onRequestChange={open => this.setState({ open })}
              >
                <div>
                  <NavDrawer
                    close={() => this.setState({ open: !this.state.open })}
                    openingCallback={this.openingForm}
                  />
                </div>
              </Drawer>
              <MainArea companyDash={this.renderMain()} />
            </div>
          </div>
          {this.props.loading.isloading ? <BusyIndicator /> : null}
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ company, companyDash, loading, modals }) {
  return { company, companyDash, loading, modals };
}
export default connect(mapStateToProps, actions)(CompanyDashboard);