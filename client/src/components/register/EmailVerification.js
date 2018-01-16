import React from 'react';

export default class EmailVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
    };
  }

  render() {
    return (
      <div
        className="card"
        style={{
          width: '80%',
          maxWidth: 500,
          margin: 'auto',
          padding: 100,
          textAlign: 'center',
        }}
      >
        <span className="icon">
          <i className="fas fa-cross" />
        </span>
        Please check your inbox and verify your email and then Login to continue.
        <div className="field is-grouped">
          <div className="control">
            <a href="/"><button className="button is-link is-rounded">LOGIN</button></a>
          </div>
        </div>
      </div>
    );
  }
}
