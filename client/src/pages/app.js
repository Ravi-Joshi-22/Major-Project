import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/app';
import CompanyRegister from './companyRegister/index';
import Login from './login/index';
import CompanyDashboard from './companyDashboard';
import Profile from './interviewee registration';
import InterviewOpeningForm from './companyDashboard/opening';
import UserDashboard from './userDashboard/index';

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
            <Route exact path="/intervieweeRegister" component={Profile} />
            <Route exact path="/openingForm" component={InterviewOpeningForm} />
            <Route exact path="/userDashboard" component={UserDashboard}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
