import React from "react";
import MetaTags from 'react-meta-tags';
import UserDrawer from "../../components/userDashboard/userDrawer";
import ElligibleTitle from "../../components/userDashboard/elligibleTitle";
import PrefsCard from '../../components/userDashboard/preferencesCard';
import FilterCard from '../../components/userDashboard/filterCard';
import ElligibleOpenings from '../../components/userDashboard/elligibleOpenings';
import Card from 'material-ui/Card';
import Footer from '../../footer';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
          <MetaTags>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </MetaTags>
        <div className="content">
        <UserDrawer />
        <div className="columns">
        <div className="column is-8">
        <Card style={{ padding: 5, margin: 20 }}>
        <ElligibleTitle/>
        <ElligibleOpenings/>
        </Card>
        </div>
        <div className="column is-4">
        <PrefsCard/>
        <FilterCard/>
        </div>
      </div>
      <Footer/>
      </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default UserDashboard;
