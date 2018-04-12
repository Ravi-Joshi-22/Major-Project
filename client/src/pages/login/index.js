import React from 'react';
import { connect } from 'react-redux';
import BusyIndicator from '../../components/common/busyIndicator';
import ReactCardFlip from '../../components/login/ReactCardFlip';
import LoginPage from '../../components/login/Login';
import Register from '../../components/login/Register';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends React.Component {
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
          <video autoPlay muted loop id="myVideo">
            <source src=".\Assets\BGVid1.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div className="content">
            <div
              className="columns "
              style={{
                backgroundColor: 'rgba(189, 195, 199, 0.5)',
                margin: 'auto',
                marginTop: '10%',
                maxWidth: '80%',
              }}
            >
              <div className="column is-6" style={{ position: 'relative' }}>
                <img
                  src="./Assets/logoTrans.svg"
                  alt="SmartHyre"
                  style={{
                    position: 'absolute',
                    background: 'rgba(255,255,255,0.0)',
                    width: '50%',
                    height: 'auto',
                    margin: '5%',
                  }}
                />
                <img
                  src="./Assets/Hire.png"
                  alt="SmartHyre"
                  width="600"
                  height="15"
                  border="5px #ff0000"
                />
              </div>
              <div className="column is-6">
                <div
                  className="container"
                  style={{ maxWidth: '80%', marginTop: 15 }}
                >
                  <ReactCardFlip isFlipped={this.state.isFlipped}>
                    <div key="front">
                      <h1 className="card-header-title title is-2 is-centered ">
                        <font color="white">Login</font>
                      </h1>

                      <LoginPage className="card-content" />
                      <br />
                      <a
                        className="button is-primary card-footer"
                        onClick={this.handleClick}
                      >
                        New here?
                      </a>
                      <br />
                    </div>

                    <div key="back">
                      <h1 className="card-header-title title is-2 is-centered ">
                        <font color="white">Register</font>
                      </h1>

                      <Register className="card-content" />
                      <br />
                      <br />
                      <a
                        className="button is-primary card-footer"
                        onClick={this.handleClick}
                      >
                        Been here! Sign in
                      </a>
                      <br />
                    </div>
                  </ReactCardFlip>
                  {this.props.loading.isloading ? <BusyIndicator /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}
export default connect(mapStateToProps)(Login);
