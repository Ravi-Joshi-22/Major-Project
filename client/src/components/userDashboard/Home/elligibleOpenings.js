import React from "react";
import { Card, CardText } from "material-ui/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CardHeader from "material-ui/Card/CardHeader";
import ElligibleTable from "./elligibleTable";
import MoreIcon from 'material-ui/svg-icons/av/fast-forward';
import FlatButton from 'material-ui/FlatButton';

const AmdocsData = [
  {
    location: "Chennai",
    experience: "B.E./B.Tech.",
    sDate: "5 Mar",
    eDate: "15 Mar",
    salary: "4.5 lakhs"
  }
];

const AppleData = [
  {
    location: "Bangalore",
    experience: "M.E./M.Tech.",
    sDate: "2 Mar",
    eDate: "7 Mar",
    salary: "8.5 lakhs"
  }
];

const CapgeminiData = [
  {
    location: "Pune",
    experience: "B.E./B.Tech.",
    sDate: "20 Feb",
    eDate: "28 Feb",
    salary: "5 lakhs"
  }
];

const CognizantData = [
  {
    location: "Mumbai",
    experience: "B.E./B.Tech.",
    sDate: "25 Feb",
    eDate: "15 Mar",
    salary: "4 lakhs"
  }
];

const TCSData = [
  {
    location: "Delhi",
    experience: "B.E./B.Tech.",
    sDate: "5 Mar",
    eDate: "18 Mar",
    salary: "3.5 lakhs"
  }
];

const ZensarData = [
  {
    location: "Pune",
    experience: "B.E./B.Tech.",
    sDate: "8 Apr",
    eDate: "25 Apr",
    salary: "3 lakhs"
  }
];

class ElligibleOpenings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card style={{ padding: 5, margin: 20}}>
          <CardHeader
            title="Zensar Technologies"
            subtitle="Web Development"
            avatar="/Assets/zensar.png"
          />
          <CardText style={{ padding: 2 }}>
            <ElligibleTable interviewData={ZensarData} />
            <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon/>}/>
          </CardText>
        </Card>
        <Card style={{ padding: 5, margin: 20}}>
          <CardHeader
            title="Tata Consultancy Services"
            subtitle="Software Development"
            avatar="/Assets/tcs.png"
          />
          <CardText style={{ padding: 2 }}>
          <ElligibleTable interviewData={TCSData} />
          <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon/>}/>
          </CardText>
        </Card>
        <Card style={{ padding: 5, margin: 20}}>
          <CardHeader
            title="Amdocs"
            subtitle="Software Development"
            avatar="/Assets/amdocs.jpg"
          />
          <CardText style={{ padding: 2 }}>
          <ElligibleTable interviewData={AmdocsData} />
          <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon/>}/>
          </CardText>
        </Card>
        <Card style={{ padding: 5, margin: 20}}>
          <CardHeader
            title="Apple"
            subtitle="Web Design"
            avatar="/Assets/apple.png"
          />
          <CardText style={{ padding: 2 }}>
          <ElligibleTable interviewData={AppleData} />
          <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon/>}/>
          </CardText>
        </Card>
        <Card style={{ padding: 5, margin: 20}}>
          <CardHeader
            title="Capgemini"
            subtitle="Software Testing"
            avatar="/Assets/capgemini.jpg"
          />
          <CardText style={{ padding: 2 }}>
          <ElligibleTable interviewData={CapgeminiData} />
          <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon/>}/>
          </CardText>
        </Card>
        <Card style={{ padding: 5, margin: 20}}>
          <CardHeader
            title="Cognizant"
            subtitle="Senior Software Engineer"
            avatar="/Assets/cognizant.png"
          />
          <CardText style={{ padding: 2 }}>
          <ElligibleTable interviewData={CognizantData} />
          <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon/>}/>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default ElligibleOpenings;
