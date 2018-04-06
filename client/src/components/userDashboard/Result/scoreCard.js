import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactCardFlip from '../../login/ReactCardFlip';
import { lightBlue100 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Undo from 'material-ui/svg-icons/content/undo';
import Redo from 'material-ui/svg-icons/content/redo';

class ScoreCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.setState({ isFlipped: !this.state.isFlipped });
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={this.props.muiTheme}>
        <div>
          <div
            className="container"
            style={{ maxWidth: 500, marginTop: 27, maxHeight: 200 }}
          >
            <ReactCardFlip isFlipped={this.state.isFlipped}>
              <div key="front">
                <Card>
                  <div className="columns">
                    <div className="column is-10">
                      <div style={{ display: 'flex' }}>
                        <CardHeader
                          title={this.props.resultInfo.company_id.company_name}
                          subtitle={this.props.resultInfo.position}
                          avatar={this.props.resultInfo.company_id.company_logo}
                          width="1000"
                        />
                        <CardText>
                          <br />
                          Rs{this.props.resultInfo.salary}
                          <br />
                        </CardText>
                      </div>
                      <CardText>
                        <b>
                          <center>
                            {' '}
                            {this.props.resultInfo.interviewees[0].interview_status.toUpperCase()}
                          </center>
                        </b>
                      </CardText>
                    </div>
                    <div className="column is-2">
                      <FloatingActionButton
                        mini={true}
                        onClick={this.handleClick}
                      >
                        <Redo />
                      </FloatingActionButton>
                    </div>
                  </div>
                </Card>
              </div>
              <div key="back">
                <Card>
                  <CardText className="columns">
                    <p className="column">
                      <b>
                        {' '}
                        Score: {this.props.resultInfo.interviewees[0].score}
                      </b>
                      <br />
                      Location: {this.props.resultInfo.location}
                      <br />
                    </p>
                    <p className="column">
                      Skills: {this.props.resultInfo.skills}
                      <br />
                      Experience: {this.props.resultInfo.experience_min}-
                      {this.props.resultInfo.experience_max} Years
                    </p>
                  </CardText>
                  <div>
                    <FloatingActionButton
                      mini={true}
                      onClick={this.handleClick}
                      style={{ marginBottom: 8, marginLeft: 8 }}
                    >
                      <Undo />
                    </FloatingActionButton>
                  </div>
                </Card>
              </div>
            </ReactCardFlip>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default ScoreCard;
