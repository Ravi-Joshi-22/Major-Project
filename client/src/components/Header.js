import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.test) {
      case null:
        return <h1>COOL</h1>;
      default:
        return <h1>{this.props.test.user}</h1>;
    }
  }

  render() {
    console.log(this.props.test);
    return (
      <nav>
        <div>{this.renderContent()}</div>
      </nav>
    );
  }
}

function mapStateToProps({ test }) {
  return { test };
}

export default connect(mapStateToProps)(Header);
