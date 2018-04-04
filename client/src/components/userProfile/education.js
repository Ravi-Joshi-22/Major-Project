import React from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Graduation from '../userProfile/UserDetailsForm/Graduation';
import * as actions from '../../actions/interviewee/education';

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
      <div>
        <CardHeader
          title={eachDegree.college}
          subtitle={eachDegree.degree}
          avatar="/Assets/educ.jpg"
        />
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
          <FloatingActionButton mini={true} style={{ margin: 5 }}>
            <DeleteIcon onClick={() => this.deleteGraduation(eachDegree._id)} />
          </FloatingActionButton>
        </CardActions>
        <CardText style={{ padding: 2 }}>
          {eachDegree.stream}
          <br />
          {eachDegree.start_year}-{eachDegree.end_year}
          <br />
          {eachDegree.performance.scale}:{eachDegree.performance.value}
          <br />
        </CardText>
      </div>
    ));
    return afterCards;
  }
  renderBeforeSeniorSecondary() {
    return (
      <div>
        <CardHeader
          title={this.props.beforeEducation.secondary.school}
          subtitle="10"
          avatar="/Assets/educ.jpg"
        />
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
        </CardActions>
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
        <CardHeader
          title={this.props.beforeEducation.senior_sec.school}
          subtitle="12"
          avatar="/Assets/sec.jpg"
        />
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
        </CardActions>
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
            <div className="column is-8">
              <CardTitle title="Education" />
              {!beforeEducation ? null : this.renderBeforeSeniorSecondary()}
              {afterEducation.length > 0
                ? this.renderAfterSeniorSecondary()
                : null}
            </div>
            <div className="column is-4">
              <Graduation />
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}
export default connect(null, actions)(Education);
