import React from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { IconButton } from 'material-ui';
import ExpModal from '../userProfile/modalOpening/expmodal';
import EditIcon from 'material-ui/svg-icons/image/edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.renderExperience = this.renderExperience.bind(this);
    this.renderInternships = this.renderInternships.bind(this);
    this.getDateStr = this.getDateStr.bind(this);
  }

  getDateStr(date) {
    const dateStr = new Date(date);
    const sDateStr = `${dateStr.getDate()} -
      ${dateStr.getMonth() + 1}-
      ${dateStr.getFullYear()}`;
    return sDateStr;
  }

  renderExperience() {
    const expCards = this.props.jobExperience.map((eachExp, key) => (
      <Card style={{ padding: 5, margin: 5 }}>
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
          <IconButton className="icon" tooltip="Edit">
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardHeader title={eachExp.organization} subtitle={eachExp.profile} />
        <CardText style={{ padding: 2 }}>
          {eachExp.location}
          <br /> {this.getDateStr(eachExp.start_date)}
          <br />
          {eachExp.description}
          <br />
        </CardText>
      </Card>
    ));
    return expCards;
  }

  renderInternships() {
    const expCards = this.props.internshipExperience.map((eachExp, key) => (
      <Card style={{ padding: 5, margin: 5 }}>
        <CardActions>
          <IconButton className="icon" tooltip="Edit">
            <EditIcon />
          </IconButton>
          <IconButton className="icon" tooltip="Edit">
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardHeader title={eachExp.organization} subtitle={eachExp.profile} />
        <CardText style={{ padding: 2 }}>
          {eachExp.location}
          <br />
          {this.getDateStr(eachExp.start_date)}
          <br />
          {eachExp.description}
          <br />
        </CardText>
      </Card>
    ));
    return expCards;
  }

  render() {
    const { jobExperience, internshipExperience } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 10 }}>
          <div className="columns">
            <div className="column is-11">
              <CardTitle title="Experience" />
            </div>
            <div className="column is-1">
              <ExpModal />
            </div>
          </div>

          <div className="columns">
            {jobExperience.length > 0 ? this.renderExperience() : null}
            {internshipExperience.length > 0 ? this.renderInternships() : null}
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Experience;
