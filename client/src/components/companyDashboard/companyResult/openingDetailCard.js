import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import HireCard from './hireDialog';

const styles = {
  customWidth: {
    width: 200,
  },
};

class OpeningDetailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    {
      /* const fields = [
      'START DATE',
      'END DATE',
      'LOCATION',
      'SALARY',
      'SKILLS',
      'MINIMUM EXPERIENCE',
      'MAXIMUM EXPERIENCE',
      'RESPONSIBILITIES',
      'QUALIFICATIONS',
   ];*/
    }
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 25, margin: 20 }}>
          <CardTitle title="Software Developer" />
          <CardText style={{ padding: 2 }}>
            <div className="columns">
              <div className="column is-8">
                <table>
                  <tbody displayRowCheckbox={false}>
                    {/* <TableHeaderColumn>
                  {fields.map((eachField, key) => (
                    <TableRowColumn style={{ width: '15%' }}>
                      {eachField}
                    </TableRowColumn>
                  ))}
                </TableHeaderColumn>*/}
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>START DATE</b>
                      </td>
                      <td style={{ width: '25%' }}>12/04/2018</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>END DATE</b>
                      </td>
                      <td style={{ width: '25%' }}>23/04/2018</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>LOCATION</b>
                      </td>
                      <td style={{ width: '25%' }}>Indore</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>SALARY</b>
                      </td>
                      <td style={{ width: '25%' }}>5.5 lakhs</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>SKILLS</b>
                      </td>
                      <td style={{ width: '25%' }}>Java, C, HTML, Oracle</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>MINIMUM EXPERIENCE</b>
                      </td>
                      <td style={{ width: '25%' }}>0 yr(s)</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>MAXIMUM EXPERIENCE</b>
                      </td>
                      <td style={{ width: '25%' }}>5 yr(s)</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>RESPONSIBILITIES</b>
                      </td>
                      <td style={{ width: '25%' }}>To develop java software</td>
                    </tr>
                    <tr>
                      <td style={{ width: '25%' }}>
                        <b>QUALIFICATIONS</b>
                      </td>
                      <td style={{ width: '25%' }}>B.E./B.Tech</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="column is-4">
                <DropDownMenu
                  value={this.state.value}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  autoWidth={false}
                >
                  <MenuItem value={1} primaryText="All Results" />
                  <MenuItem value={2} primaryText="Selected" />
                  <MenuItem value={3} primaryText="Rejected" />
                  <MenuItem value={4} primaryText="Given" />
                  <MenuItem value={5} primaryText="Applied" />
                </DropDownMenu>
              </div>
            </div>
            <div className="columns">
              <div className="column is-10" />
              <div className="column is-2">
                <HireCard />
              </div>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default OpeningDetailCard;
