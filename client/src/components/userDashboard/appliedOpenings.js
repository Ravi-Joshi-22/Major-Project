import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardTitle, CardText } from "material-ui/Card";
import CurrentTable from "./AppliedOpenings/currentTable";
import UpcomingTable from "./AppliedOpenings/upcomingTable";
import BackIcon from "material-ui/svg-icons/av/fast-rewind";
import { FlatButton } from "material-ui";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import { connect } from "react-redux";
import * as actions from "../../actions/interviewee";

const style = {
  margin: 22,
  alignItems: "flex-end"
};

class AppliedOpenings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAppliedOpenings();
  }

  renderTableContent() {
    const { intervieweeOpenings } = this.props;
    const renderOpeningContent = intervieweeOpenings.map((eachOpening, key) => (
      <Card style={{ padding: 10, margin: 0 }}>
        <CardText style={{ padding: 2 }}>
          <Subheader>
            <font color="#00BCD4">Current Openings</font>
          </Subheader>
          <Divider />
          <CurrentTable interviewData={eachOpening} />
          <Subheader>
            <font color="#00BCD4">Upcoming Openings</font>
          </Subheader>
          <Divider />
          <UpcomingTable interviewData={eachOpening} />
        </CardText>
      </Card>
    ));
    return renderOpeningContent;
  }

  render() {
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
export default connect(mapStateToProps, actions)(AppliedOpenings);
