import React from "react";
import UserDrawer from "../../components/userDashboard/userDrawer";
import ElligibleTitle from "../../components/userDashboard/elligibleTitle";
import PrefsCard from "../../components/userDashboard/preferencesCard";
import FilterCard from "../../components/userDashboard/filterCard";
import ElligibleOpenings from "../../components/userDashboard/elligibleOpenings";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Card from "material-ui/Card";
import Footer from "../../components/common/footer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppliedOpenings from "../../components/userDashboard/appliedOpenings";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.appliedOpeningForm = this.appliedOpeningForm.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  appliedOpeningForm() {
    console.log("toggle3");
    this.handleToggle();
  }

  render() {
    const customContentStyle = {
      width: "80%",
      maxWidth: "none"
    };
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleToggle} />
    ];
    return (
      <MuiThemeProvider>
        <div>
          <div className="content">
            <Dialog
              title="Your Applied Openings"
              actions={actions}
              contentStyle={customContentStyle}
              open={this.state.open}
              onRequestClose={this.handleToggle}
              modal={false}
              autoScrollBodyContent={true}
            >
              <AppliedOpenings />
            </Dialog>
            <UserDrawer appliedOpeningCallback={this.appliedOpeningForm} />
            <div className="columns">
              <div className="column is-8">
                <ElligibleTitle />
                <Card style={{ padding: 5, margin: 20 }}>
                  <ElligibleOpenings />
                </Card>
              </div>
              <div className="column is-4">
                <PrefsCard />
                <FilterCard />
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default UserDashboard;
