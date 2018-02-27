import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/app';
import CompanyRegister from './companyRegister/index';
import Login from './login/index';
import UserDashboard from './userDashboard/index';
import CompanyDashboard from './companyDashboard'
import IntervieweeRegister from "./interviewee registration";
import UserProfile from "./userProfile";


//In jsx exact={true} is similar to exact
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/companyRegister" component={CompanyRegister} />
            <Route exact path="/companyDashboard" component={CompanyDashboard} />
            <Route exact path="/userDashboard" component={UserDashboard}/>
            <Route exact path="/intervieweeRegister" component={IntervieweeRegister} />
            <Route exact path="/userProfile" component={UserProfile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
