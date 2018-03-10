import React from "react";
import ElligibleTitle from "./Home/elligibleTitle";
import PrefsCard from "./Home/preferencesCard";
import FilterCard from "./Home/filterCard";
import ElligibleOpenings from "./Home/elligibleOpenings";
import Card from "material-ui/Card";
import { MuiThemeProvider } from "material-ui/styles";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div>
            <div className="columns">
            <div className="column is-8">
                <ElligibleTitle muiTheme={this.props.muiTheme} />
                <ElligibleOpenings muiTheme={this.props.muiTheme}/>
            </div>
            <div className="column is-4">
                <PrefsCard muiTheme={this.props.muiTheme}/>
                <FilterCard muiTheme={this.props.muiTheme}/>
            </div>
            </div>
        </div>
        </MuiThemeProvider>
    );
  }
}

export default Home;