import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import BusyIndicator from "../../components/common/busyIndicator";
import ReactCardFlip from "../../components/login/ReactCardFlip";
import LoginPage from "../../components/login/Login";
import Register from "../../components/login/Register";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { lightBlue100 } from "material-ui/styles/colors";
let imgUrl = "/Assets/Hire.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
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
            className="columns "
            style={{ marginTop: 40, backgroundColor: lightBlue100 }}
          >
            <div className="column is-7">
              <img
                src="./Assets/Hire.png"
                alt="SmartHyre"
                width="600"
                height="15"
                border="5px #ff0000"
              />
            </div>
            <div className="column is-5">
              <div
                className="container"
                style={{ maxWidth: 400, marginTop: 15 }}
              >
                <ReactCardFlip isFlipped={this.state.isFlipped}>
                  <div key="front">
                    <h1 className="card-header-title title is-2 is-centered ">
                      Login
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
                      Register
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
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ loading }) {
  return { loading };
}
export default connect(mapStateToProps)(Login);
