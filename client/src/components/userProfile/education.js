import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Graduation from '../userProfile/UserDetailsForm/Graduation';
import * as actions from '../../actions/interviewee/education';
import Divider from 'material-ui/Divider';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.renderAfterSeniorSecondary = this.renderAfterSeniorSecondary.bind(
      this
    );
    this.renderBeforeSeniorSecondary = this.renderBeforeSeniorSecondary.bind(
      this
    );
    this.deleteGraduation = this.deleteGraduation.bind(this);
  }
  deleteGraduation(degreeId) {
    const requestObj = {
      degree: {
        _id: degreeId,
      },
    };
    this.props.deleteDegree(requestObj);
  }
  renderAfterSeniorSecondary() {
    const afterCards = this.props.afterEducation.map((eachDegree, key) => (
      <div className="columns">
        <div className="column is-11">
          <Divider />
          <CardHeader
            title={eachDegree.college}
            subtitle={eachDegree.degree}
            avatar="/Assets/educ.jpg"
          />

          <CardText style={{ padding: 2 }}>
            {eachDegree.stream}
            <br />
            {eachDegree.start_year}-{eachDegree.end_year}
            <br />
            {eachDegree.performance.scale}:{eachDegree.performance.value}
            <br />
          </CardText>
        </div>
        <div className="column is-1">
          <CardActions>
            <FloatingActionButton mini={true} style={{ margin: 5, padding: 2 }}>
              <DeleteIcon
                onClick={() => this.deleteGraduation(eachDegree._id)}
              />
            </FloatingActionButton>
          </CardActions>
        </div>
      </div>
    ));
    return afterCards;
  }
  renderBeforeSeniorSecondary() {
    return (
      <div>
        <Divider />
        <CardHeader
          title={this.props.beforeEducation.secondary.school}
          subtitle="10"
          avatar="/Assets/educ.jpg"
        />
        <CardText style={{ padding: 2 }}>
          {this.props.beforeEducation.secondary.board}
          <br />
          {this.props.beforeEducation.secondary.year_of_comp}
          <br />
          {this.props.beforeEducation.secondary.performance.scale}:{
            this.props.beforeEducation.secondary.performance.value
          }
          <br />
        </CardText>
        <Divider />
        <CardHeader
          title={this.props.beforeEducation.senior_sec.school}
          subtitle="12"
          avatar="/Assets/sec.jpg"
        />
        <CardText style={{ padding: 2 }}>
          {this.props.beforeEducation.senior_sec.year_of_comp}
          <br />
          {this.props.beforeEducation.senior_sec.board}
          <br />
          {this.props.beforeEducation.senior_sec.year_of_comp}
          <br />
          {this.props.beforeEducation.senior_sec.performance.scale}:{
            this.props.beforeEducation.senior_sec.performance.value
          }
          <br />
        </CardText>
      </div>
    );
  }

  render() {
    const { beforeEducation, afterEducation } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
              <CardTitle title="Education" />
              {!beforeEducation ? null : this.renderBeforeSeniorSecondary()}
              {afterEducation.length > 0
                ? this.renderAfterSeniorSecondary()
                : 'No Graduation Details are added. click on add button to add data'}
            </div>
            <div className="column is-1">
              <Graduation />
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}
export default connect(null, actions)(Education);
