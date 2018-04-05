import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import ResultIcon from 'material-ui/svg-icons/action/assessment';
import EndOpeningIcon from 'material-ui/svg-icons/action/lock';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import * as actions from '../../../actions/company';

class OpeningsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  getDateStr(date) {
    const dateStr = new Date(date);
    const sDateStr =
      dateStr.getDate() +
      '- ' +
      (dateStr.getMonth() + 1) +
      '- ' +
      dateStr.getFullYear();
    return sDateStr;
  }

  handleExpandChange = expanded => {
    this.setState({ expanded: expanded });
  };

  render() {
    const fields = ['START DATE', 'END DATE', 'SALARY'];
    const deleteOpeningActions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Yes"
        primary={true}
        onClick={() =>
          this.props.companyDeleteOpenings(this.props.openingsData._id)
        }
      />,
    ];
    const endOpeningActions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Yes" primary={true} onClick={this.handleClose} />,
    ];
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card
          style={{ padding: 5, margin: 20 }}
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
        >
          <CardHeader
            title={this.props.openingsData.position}
            subtitle={
              'No of candidates applied: ' +
              this.props.openingsData.interviewees.length
            }
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div className="columns">
              <div className="column is-8">
                <table>
                  <thead>
                    <tr>
                      {fields.map((eachField, key) => (
                        <th style={{ width: '25%' }}>{eachField}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody displayRowCheckbox={false}>
                    <tr>
                      <td style={{ width: '25%' }}>
                        {this.getDateStr(this.props.openingsData.start_date)}
                      </td>
                      <td style={{ width: '25%' }}>
                        {this.getDateStr(this.props.openingsData.end_date)}
                      </td>
                      <td style={{ width: '25%' }}>
                        {this.props.openingsData.salary}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="column is-4">
                <FloatingActionButton
                  mini={true}
                  style={{ margin: 5 }}
                  onClick={this.handleOpen}
                >
                  <DeleteIcon />
                </FloatingActionButton>
                <Dialog
                  actions={deleteOpeningActions}
                  modal={true}
                  open={this.state.open}
                >
                  Are you sure, you want to delete this opening?
                </Dialog>
              </div>
            </div>
          </CardText>
          <div className="columns">
            <div className="column is-4">
              <CardActions expandable={true}>
                <FlatButton
                  label="VIEW RESULTS"
                  primary={true}
                  icon={<ResultIcon />}
                />
              </CardActions>
            </div>
            <div className="column is-4">
              <CardActions expandable={true}>
                <FlatButton
                  label="END OPENING"
                  primary={true}
                  icon={<EndOpeningIcon />}
                  onClick={this.handleOpen}
                />
                <Dialog
                  actions={endOpeningActions}
                  modal={true}
                  open={this.state.open}
                >
                  Are you sure, you want to end this opening right now?
                </Dialog>
              </CardActions>
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(OpeningsCard);
