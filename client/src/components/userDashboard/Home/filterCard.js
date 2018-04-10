import React from "react";
import { Card, CardText, CardTitle } from "material-ui/Card";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ApplyIcon from 'material-ui/svg-icons/action/done';
import FlatButton from 'material-ui/FlatButton';

class FilterCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <Card style={{ padding: 5, margin: 20 }}>
          <CardTitle title="Filters" />
          <CardText style={{ padding: 2 }}>
            <div className="field has-addons">
              <div className="control">
                <input className="input" type="text" placeholder="Search Jobs" />
              </div>
              <div className="control">
                <a className="button is-info">Search</a>
              </div>
            </div>
            <div className="field">
              <label className="label">Choose Start Date</label>
              <div className="control">
                <input
                  ref="sDateInput"
                  className="input"
                  type="date"
                  placeholder="Start Date"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Choose End Date</label>
              <div className="control">
                <input
                  placeholder="End Date"
                  ref="eDateInput"
                  className="input"
                  type="date"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Choose Location</label>
              <div className="control">
                <input
                  placeholder="Location"
                  ref="locationInput"
                  className="input"
                  type="text"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Type Of Job</label>
              <div className="control">
                <div className="select">
                  <select>
                    <option>Select Type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Work From Home</option>
                  </select>
                </div>
              </div>
            </div>
            <FlatButton label="APPLY FILTERS" primary={true} icon={<ApplyIcon />} />
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default FilterCard;
