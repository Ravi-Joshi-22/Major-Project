import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/interview/';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blue300, red300, indigo900, red900 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardText} from 'material-ui/Card';
import {
  teal300,
  teal100,
  teal200,
  lightBlue500,
  lightBlue50,
} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal300,
    primary2Color: teal200,
    accent1Color: teal200,
    shadowColor: lightBlue500,
  },
});

class PostInterview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={this.props.muiTheme}>
          <div>
            <AppBar
              title="SmartHyre"
              iconElementLeft={<div />}
              style={{ width: '114%', marginLeft: '-7%' }}
            />
            <div>
            <Card
                style={{
                  maxWidth: 900,
                  padding: 10,
                  margin: "auto",
                  marginTop: 30
                }}
              >
                <CardText style={{ padding: 20 }}>
                  <b>Heyaaaaaa!!</b><br/>
                  You have successfully completed the  interview.:)<br/>
                  Thankyou!<br/>
                  The results will be sent to you via mails.<br/>
                </CardText>
              </Card>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps({ }) {
  return { };
}
export default connect(mapStateToProps, actions)(PostInterview);
