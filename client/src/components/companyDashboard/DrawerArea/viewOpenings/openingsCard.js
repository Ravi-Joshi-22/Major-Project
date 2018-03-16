import React from 'react';
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
import IconButton from 'material-ui/IconButton/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
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
    };
  }

  handleExpandChange = expanded => {
    this.setState({ expanded: expanded });
  };

  render() {
    const fields = ['START DATE', 'END DATE', 'SALARY'];
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
                title="Software Developer"
                subtitle="No of candidates applied: 8"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <div className="columns">
                  <div className="column is-10">
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
                          <td style={{ width: '25%' }}>23/04/2018</td>
                          <td style={{ width: '25%' }}>31/04/2018</td>
                          <td style={{ width: '25%' }}>5.5 lakhs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="column is-2">
                    <FloatingActionButton mini={true}>
                      <EditIcon />
                    </FloatingActionButton>
                    <FloatingActionButton mini={true}>
                      <DeleteIcon />
                    </FloatingActionButton>
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

export default OpeningsCard;
