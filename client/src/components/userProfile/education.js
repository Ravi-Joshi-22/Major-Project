import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
import EduModal from '../userProfile/modalOpening/eduModal';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.renderAfterSeniorSecondary = this.renderAfterSeniorSecondary.bind(
      this
    );
    this.renderBeforeSeniorSecondary = this.renderBeforeSeniorSecondary.bind(
      this
    );
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
          <IconButton className="icon" tooltip="Edit">
            <DeleteIcon />
          </IconButton>
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
          <IconButton className="icon" tooltip="Edit">
            <DeleteIcon />
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
          <IconButton className="icon" tooltip="Edit">
            <DeleteIcon />
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
            <div className="column is-11">
              <CardTitle title="Education" />
              {!beforeEducation ? null : this.renderBeforeSeniorSecondary()}
              {afterEducation.length > 0
                ? this.renderAfterSeniorSecondary()
                : null}
            </div>
            <div className="column is-1">
              <EduModal />
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Education;
