import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class Reports extends React.Component {
  render() {
    const myStyle = {
      parentStyle: {
        position: 'relative',
      },
      childStyle: {
        position: 'absolute',
        top: 27,
        left: 27,
      },
    };
    return (
      <div>
        <div className="columns">
          <div className="column is-10">
            <p className="subtitle">Upcoming Openings:</p>
          </div>
          <div className="column is-2">
            <p className="subtitle">
              {this.props.companyDash.no_of_upcoming_openings}
            </p>
          </div>
        </div>
        <p className="subtitle">All time total:</p>
        <div className="columns">
          <br />
          <div className="column is-6">
            <p>Candidates</p>
            <div style={myStyle.parentStyle}>
              <CircularProgress size={60} thickness={7} />
              <div style={myStyle.childStyle}>
                <h1 style={{ fontSize: 22 }}>
                  {this.props.companyDash.total_candidates}
                </h1>
              </div>
            </div>
          </div>
          <div className="column is-6">
            <p>Openings</p>
            <div style={myStyle.parentStyle}>
              <CircularProgress size={60} thickness={7} />
              <div style={myStyle.childStyle}>
                <h1 style={{ fontSize: 22 }}>
                  {this.props.companyDash.total_openings}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <p className="subtitle">Average:</p>
        <div className="columns">
          <br />
          <div className="column is-4">
            <p>Candidates per month</p>
            <div style={myStyle.parentStyle}>
              <CircularProgress size={60} thickness={7} />
              <div style={myStyle.childStyle}>
                <h1 style={{ fontSize: 22 }}>
                  {this.props.companyDash.avg_candidates_applied_per_month}
                </h1>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <p>Candidates per opening</p>
            <div style={myStyle.parentStyle}>
              <CircularProgress size={60} thickness={7} />
              <div style={myStyle.childStyle}>
                <h1 style={{ fontSize: 22 }}>
                  {this.props.companyDash.avg_candidates_per_opening}
                </h1>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <p>Openings per month</p>
            <div style={myStyle.parentStyle}>
              <CircularProgress size={60} thickness={7} />
              <div style={myStyle.childStyle}>
                <h1 style={{ fontSize: 22 }}>
                  {this.props.companyDash.avg_openings_per_month}
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="columns">
          <div className="column is-10">
            <p className="subtitle">Candidates giving Interview per Opening:</p>
          </div>
          <div className="column is-2">
            <p className="subtitle">
              {
                this.props.companyDash
                  .no_of_candidates_giving_interview_per_opening
              }
            </p>
          </div>
        </div> */}
      </div>
    );
  }
}
