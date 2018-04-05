import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardTitle, CardText } from "material-ui/Card";
import CurrentTable from "./AppliedOpenings/currentTable";
import UpcomingTable from "./AppliedOpenings/upcomingTable";
import BackIcon from "material-ui/svg-icons/av/fast-rewind";
import { FlatButton } from "material-ui";
import { Tabs, Tab } from "material-ui/Tabs";
import { connect } from "react-redux";
import * as actions from "../../actions/interviewee";

class AppliedOpenings extends React.Component {
  constructor(props) {
    super(props);
    this.noOpeningContent = this.noOpeningContent.bind(this);
    this.renderCurrentTableContent = this.renderCurrentTableContent.bind(this);
    this.renderUpcomingTableContent = this.renderUpcomingTableContent.bind(
      this
    );
  }

  componentDidMount() {
    this.props.getAppliedOpenings();
  }

  renderCurrentTableContent() {
    const { intervieweeOpenings } = this.props;
    const currentArray = intervieweeOpenings.currentOpenings;
    return <CurrentTable interviewData={currentArray} />;
  }

  renderUpcomingTableContent() {
    const { intervieweeOpenings } = this.props;
    const upcomingArray = intervieweeOpenings.upcomingOpenings;
    return <UpcomingTable interviewData={upcomingArray} />;
  }

  noOpeningContent() {
    return <p> No Openings Available</p>;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div>
          <Card style={{ padding: 10, margin: 20 }}>
            <CardTitle title="Your Applied Openings" />
          </Card>
          <Card style={{ padding: 10, margin: 20 }}>
            <CardText style={{ padding: 2 }}>
              <Tabs>
                <Tab label="Current Applied Openings">
                  <div>
                    {this.props.intervieweeOpenings
                      ? this.renderCurrentTableContent()
                      : this.noOpeningContent()}
                  </div>
                </Tab>
                <Tab label="Upcoming Applied Openings">
                  <div>
                    {this.props.intervieweeOpenings
                      ? this.renderUpcomingTableContent()
                      : this.noOpeningContent()}
                  </div>
                </Tab>
              </Tabs>
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ intervieweeOpenings }) {
  return { intervieweeOpenings };
}
export default connect(mapStateToProps, actions)(AppliedOpenings);
