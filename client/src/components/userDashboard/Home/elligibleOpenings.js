import React from "react";
import { Card, CardText } from "material-ui/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CardHeader from "material-ui/Card/CardHeader";
import ElligibleTable from "./elligibleTable";
import MoreIcon from "material-ui/svg-icons/av/fast-forward";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import * as actions from "../../../actions/interviewee";

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

    this.renderTableContent = this.renderTableContent.bind(this);
  }

  componentDidMount() {
    this.props.getElligibleOpenings();
  }

  renderTableContent() {
    const { intervieweeOpenings } = this.props;
    const renderOpeningContent = intervieweeOpenings.map((eachOpening, key) => (
      <Card style={{ padding: 5, margin: 20 }}>
        <CardHeader
          title={eachOpening.company_id}
          subtitle={eachOpening.position}
          avatar="www"
        />
        <CardText style={{ padding: 2 }}>
          <ElligibleTable interviewData={eachOpening} />
          <FlatButton label="MORE DETAILS" primary={true} icon={<MoreIcon />} />
        </CardText>
      </Card>
    ));
    return renderOpeningContent;
  }

  render() {
    console.log(this.props.intervieweeOpenings);
    return (
      <MuiThemeProvider>
        <div>
          {this.props.intervieweeOpenings ? this.renderTableContent() : null}
        </div>
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps({ intervieweeOpenings }) {
  return { intervieweeOpenings };
}
export default connect(mapStateToProps, actions)(ElligibleOpenings);
