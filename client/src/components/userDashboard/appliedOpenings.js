import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardTitle, CardText } from "material-ui/Card";
import CurrentTable from "./AppliedOpenings/currentTable";
import UpcomingTable from "./AppliedOpenings/upcomingTable";
import BackIcon from "material-ui/svg-icons/av/fast-rewind";
import { FlatButton } from "material-ui";
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const currentAppliedData = [
  {
    companyName: "TCS",
    profile: "Associate Software Developer",
    location: "Chennai",
    experience: "B.E./B.Tech.",
    startDate: "5 Mar",
    endDate: "15 Mar"
  },
  {
    companyName: "Amdocs",
    profile: "Software Developer",
    location: "Pune",
    experience: "B.E./B.Tech.",
    startDate: "8 Feb",
    endDate: "23 Feb"
  },
  {
    companyName: "GGK Technology",
    profile: "System Developer",
    location: "Mumbai",
    experience: "2 years",
    startDate: "5 Feb",
    endDate: "15 Mar"
  },
  {
    companyName: "Gyrix",
    profile: "Software Developer",
    location: "Noida",
    experience: "3 years",
    startDate: "25 Jan",
    endDate: "15 Mar"
  },
  {
    companyName: "Infotree",
    profile: "Database Administrator",
    location: "Bangalore",
    experience: "B.E./B.Tech.",
    startDate: "9 Mar",
    endDate: "18 Mar"
  },
  {
    companyName: "ArthTech",
    profile: "Tester",
    location: "Gurgaon",
    experience: "1.5 years",
    startDate: "9 Apr",
    endDate: "18 Apr"
  }
];
const upcomingAppliedData = [
  {
    companyName: "Noob Games Pvt. Ltd.",
    profile: "Software Developer",
    location: "Indore",
    experience: "B.E./B.Tech.",
    startDate: "5 Feb",
    endDate: "15 Mar"
  },
  {
    companyName: "MindTree",
    profile: "Associate System Developer",
    location: "Hyderabad",
    experience: "2.5 years",
    startDate: "15 Mar",
    endDate: "3 Apr"
  },
  {
    companyName: "Syntel",
    profile: "Project Manager",
    location: "Indore",
    experience: "3 years",
    startDate: "15 Apr",
    endDate: "25 May"
  }
];

const style = {
  margin: 22,
  alignItems: "flex-end"
};

class AppliedOpenings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 10, margin: 0 }}>
          <CardText style={{ padding: 2 }}>
            <Subheader><font color='#00BCD4'>Current Interviews</font></Subheader>
            <Divider/>
            <CurrentTable interviewData={currentAppliedData} />
            <Subheader><font color='#00BCD4'>Upcoming Interviews</font></Subheader>
            <Divider/>
            <UpcomingTable interviewData={upcomingAppliedData} />
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default AppliedOpenings;