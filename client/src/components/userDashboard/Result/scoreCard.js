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
          <div className="container" style={{ maxWidth: 400, marginTop: 30 }}>
            <ReactCardFlip isFlipped={this.state.isFlipped}>
              <div key="front">
                <Card
                  style={{
                    Width: '100%',
                    margin: 'auto',
                  }}
                >
                  <div className="columns">
                    <div className="column is-10">
                      <div style={{ display: 'flex' }}>
                        <CardHeader
                          title="Postion"
                          avatar="http://1000logos.net/wp-content/uploads/2017/07/dell-symbol.jpg"
                          width="1000"
                        />
                        <CardText>
                          {
                            this.props.resultInfo.interviewees[0]
                              .interview_status
                          }
                          <br /> {this.props.resultInfo.salary}
                          <br />
                          {this.props.resultInfo.location}
                        </CardText>
                      </div>
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
                <Card
                  style={{
                    maxWidth: 800,
                  }}
                >
                  <CardText>
                    <b>{this.props.resultInfo.interviewees[0].score}</b>
                    <br />{' '}
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
