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
import MoreIcon from 'material-ui/svg-icons/av/fast-forward';
import EditIcon from 'material-ui/svg-icons/content/create';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import * as actions from '../../../actions/company';
import InterviewOpening from '../DrawerArea/InterviewOpening';

const styles = {
  checkbox: {
    margin: 20,
    padding: 20,
  },
};

class OpeningsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      checked: false,
      open: false,
    };
    this.openingForm = this.openingForm.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  async openingForm() {
    const { showOpeningModal, hideOpeningModal } = this.props;
    if (this.props.modals.companyOpeningModal.show === 'modal') {
      showOpeningModal(this.props.openingsData);
    } else {
      hideOpeningModal();
    }
  }

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
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Yes"
        primary={true}
        onClick={() =>
          this.props.companyDeleteOpenings(this.props.openingsData._id)
        }
      />,
    ];
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div className="columns">
          <div className="column is-1">
            <Checkbox style={styles.checkbox} />
          </div>
          <div className="column is-11">
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
                            {this.getDateStr(
                              this.props.openingsData.start_date
                            )}
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
                      onClick={this.openingForm}
                    >
                      <EditIcon />
                    </FloatingActionButton>
                    <FloatingActionButton
                      mini={true}
                      style={{ margin: 5 }}
                      onClick={this.handleOpen}
                    >
                      <DeleteIcon />
                    </FloatingActionButton>
                    <Dialog
                      actions={actions}
                      modal={true}
                      open={this.state.open}
                    >
                      Are you sure, you want to delete this opening?
                    </Dialog>
                  </div>
                </div>
              </CardText>
              <CardActions expandable={true}>
                <FlatButton
                  label="MORE DETAILS"
                  primary={true}
                  icon={<MoreIcon />}
                />
              </CardActions>
            </Card>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ modals }) {
  return { modals };
}

export default connect(mapStateToProps, actions)(OpeningsCard);
