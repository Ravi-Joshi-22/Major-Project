import React from 'react';
import { connect } from 'react-redux';
import { teal100 } from 'material-ui/styles/colors';
import * as actions from '../../../actions/company';
import { Card, CardTitle, CardText, CardHeader } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import HireCard from './hireDialog';
import { teal300 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';

const styles = {
  customWidth: {
    width: 200,
  },
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class OpeningDetailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    this.getSubtitle = this.getSubtitle.bind(this);
    this.renderChip = this.renderChip.bind(this);
  }

  renderChip(data) {
    if (data) {
      return (
        <div style={this.styles.wrapper}>
          {data.map((eachMap, key) => {
            <Chip backgroundColor={teal100} style={this.styles.chip}>
              {eachMap}
            </Chip>;
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  getSubtitle(respon) {
    let resStr = '';
    if (respon) {
      respon.map((eachRes, key) => {
        if (key === 0) {
          resStr = resStr + eachRes;
        } else {
          resStr = resStr + ', ' + eachRes;
        }
      });
      return resStr;
    } else {
      return resStr;
    }
  }

  handleChange = async (event, index, value) => {
    await this.setState({ value });
    const array = ['', '', 'selected', 'rejected', 'given', 'applied'];
    await this.props.companyOpeningResults(
      this.props.openingId,
      array[this.state.value]
    );
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

  render() {
    const fields = [
      'START DATE',
      'END DATE',
      'LOCATION',
      'SALARY',
      'EXPERIENCE',
      'QUALIFICATION',
    ];
    const openingData = this.props.details;

    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 25, margin: 20 }}>
          <CardHeader
            title={openingData.position}
            subtitle={this.getSubtitle(openingData.responsibilities)}
            avatar="/Assets/workIcon.png"
          />
          <CardText style={{ padding: 2 }}>
            <div>{this.renderChip(openingData.skills)}</div>
            <table>
              <thead>
                <tr>
                  {fields.map((eachField, key) => (
                    <th style={{ width: '15%' }}>{eachField}</th>
                  ))}
                </tr>
              </thead>
              <tbody displayRowCheckbox={false}>
                <tr>
                  <td style={{ width: '15%' }}>
                    {this.getDateStr(openingData.start_date)}
                  </td>
                  <td style={{ width: '15%' }}>
                    {this.getDateStr(openingData.end_date)}
                  </td>
                  <td style={{ width: '15%' }}>{openingData.location}</td>
                  <td style={{ width: '15%' }}>{openingData.salary} lakhs</td>
                  <td style={{ width: '15%' }}>
                    {openingData.experience_min} - {openingData.experience_max}{' '}
                    yrs
                  </td>
                  <td style={{ width: '15%' }}>{openingData.qualifications}</td>
                </tr>
              </tbody>
            </table>
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
            <div className="columns">
              <div className="column is-10" />
              <div className="column is-2">
                <HireCard openingId={this.props.details._id} />
              </div>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(OpeningDetailCard);
