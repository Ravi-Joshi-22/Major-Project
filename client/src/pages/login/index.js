import React from 'react';
import ReactDOM from 'react-dom';
import ReactCardFlip from '../../components/login/ReactCardFlip';
import LoginPage from '../../components/login/Login';
import Register from '../../components/login/Register';
import './index.css';

export default class Login extends React.Component {
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
      <div className="container" style={{ maxWidth: 600 }}>
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div className="card" key="front" style={{ padding: 50 }}>
            <h1 className="card-header-title title is-2 is-centered ">Login</h1>
            <br />
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

          <div className="card" key="back" style={{ padding: 50 }}>
            <h1 className="card-header-title title is-2 is-centered ">
              Register
            </h1>
            <br />
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
      </div>
    );
  }
}
