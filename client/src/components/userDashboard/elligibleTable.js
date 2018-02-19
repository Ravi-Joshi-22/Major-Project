import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

class ElligibleTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <table>
          <thead>
            <tr>
              <th style={{ width: '20%' }}>
                LOCATION
              </th>
              <th style={{ width: '15%' }}>
                EXPERIENCE
              </th>
              <th style={{ width: '20%' }}>
                START DATE
              </th>
              <th style={{ width: '20%' }}>
                END DATE
              </th>
              <th style={{ width: '15%' }}>
                SALARY
              </th>
              <th style={{ width: '20%' }}>
                APPLY
              </th>
            </tr>
            </thead>
          <tbody displayRowCheckbox={false}>
            {this.props.interviewData.map((eachInterview, key) => (
              <tr>
                <td style={{ width: '20%' }}>
                  {eachInterview.location}
                </td>
                <td style={{ width: '15%' }}>
                  {eachInterview.experience}
                </td>
                <td style={{ width: '20%' }}>
                  {eachInterview.sDate}
                </td>
                <td style={{ width: '20%' }}>
                  {eachInterview.eDate}
                </td>
                <td style={{ width: '15%' }}>
                  {eachInterview.salary}
                </td>
                <td style={{ width: '20%' }}>
                    <RaisedButton label="APPLY" primary={true} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MuiThemeProvider>
    );
  }
}

export default ElligibleTable;