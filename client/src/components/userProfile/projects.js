import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { IconButton } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Project from '../userProfile/UserDetailsForm/Project';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import * as actions from '../../actions/interviewee/project';
import { connect } from 'react-redux';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.renderProjects = this.renderProjects.bind(this);
    this.deleteProjects = this.deleteProjects.bind(this);
  }
  deleteProjects(testId) {
    const requestObj = {
      project: {
        _id: testId,
      },
    };
    this.props.deleteProject(requestObj);
  }
  renderProjects() {
    const projectCards = this.props.project.map((eachProject, key) => (
      <Card>
        <CardHeader
          title={eachProject.title}
          subtitle={eachProject.end_date}
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <h5>
            {eachProject.start_date} to {eachProject.end_date}
            {eachProject.currently_working}
          </h5>
          {eachProject.description}
          <CardActions>
            <RaisedButton
              label="View Link"
              primary={true}
              href={eachProject.url}
            />
            <IconButton className="icon" tooltip="Edit">
              <EditIcon />
            </IconButton>
            <FloatingActionButton mini={true} style={{ margin: 5 }}>
              <DeleteIcon
                onClick={() => this.deleteProjects(eachProject._id)}
              />
            </FloatingActionButton>
          </CardActions>
        </CardText>
      </Card>
    ));
    return projectCards;
  }

  render() {
    const { project } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
              <CardTitle title="Project Undertaken" />
              {project.length > 0 ? this.renderProjects() : null}
            </div>
            <div className="column is-1">
              <Project />
            </div>
          </div>
          <FlatButton label=">>View More" primary={true} fullWidth={true} />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(Projects);
