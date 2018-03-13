import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import MoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class UpcomingTable extends React.Component {
  constructor(props) {
    super(props);
    this.getDateStr = this.getDateStr.bind(this);
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

  render() {
    const fieldsU = [
      'COMPANY NAME',
      'PROFILE',
      'LOCATION',
      'EXPERIENCE',
      'START DATE',
      'END DATE',
      'MORE',
    ];

    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <table selectable={false}>
          <thead displaySelectAll={false} adjustForCheckbox={false}>
            <tr>
              {fieldsU.map((eachField, key) => (
                <th style={{ width: '15%' }}>{eachField}</th>
              ))}
            </tr>
          </thead>
          <tbody displayRowCheckbox={false}>
            {this.props.interviewData.map((eachOpening, key) => (
              <tr>
                <td style={{ width: '15%' }}>{eachOpening.company_id.company_name}</td>
                <td style={{ width: '20%' }}>{eachOpening.position}</td>
                <td style={{ width: '10%' }}>{eachOpening.location}</td>
                <td style={{ width: '15%' }}>
                  {eachOpening.experience_min} - {eachOpening.experience_max}{' '}
                  yrs
                </td>
                <td style={{ width: '10%' }}>
                  {this.getDateStr(eachOpening.start_date)}
                </td>
                <td style={{ width: '10%' }}>
                  {this.getDateStr(eachOpening.end_date)}
                </td>
                <td style={{ width: '10%' }}>
                  <IconButton muiTheme={this.props.muiTheme}>
                    <MoreIcon muiTheme={this.props.muiTheme}/>
                  </IconButton>
                </td>
                <td style={{ width: '10%' }}>
                  <IconButton muiTheme={this.props.muiTheme}>
                    <ClearIcon muiTheme={this.props.muiTheme}/>
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MuiThemeProvider>
    );
  }
}

export default UpcomingTable;