import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CompanyRegister from './companyRegister/index';
import Login from './login/index';
import CompanyDashboard from './companyDashboard'

//In jsx exact={true} is similar to exact
class App extends Component {
  componentDidMount() { }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Route exact path="/" component={Login} />
            <Route exact path="/companyRegister" component={CompanyRegister} />
            <Route exact path="/dashboard" component={CompanyDashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
