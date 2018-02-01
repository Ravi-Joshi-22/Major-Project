import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import './index.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/app';
import Steps, { Step } from 'rc-steps';

import CRRegisteration from '../../components/register/CRRegisteration';
import CompanyRegistration from '../../components/register/CompanyRegistration';
import OTPVerification from '../../components/register/OTPVerification';
import EmailVerification from '../../components/register/EmailVerification';
import UploadDocument from '../../components/register/UploadDocument';
import AdminValidation from '../../components/register/AdminValidation';

class CompanyRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      userData: '',
    };
    this.crRegister = this.crRegister.bind(this);
    this.companyRegister = this.companyRegister.bind(this);
    this.stepShow = this.stepShow.bind(this);
  }

  
  async crRegister(crData) {
    await this.setState({ userData: crData });
    await this.props.changeCurrentStep(1);
    this.stepShow();
  }

  async companyRegister(compData) {
    await this.props.registerCompany(
      compData,
      this.state.userData,
      this.props.history
    );
  }

  stepShow() {
    console.log('cureentStep' + this.props.currentStep);
    this.refs.step0.className = 'hidden';
    this.refs.step1.className = 'hidden';
    this.refs.step2.className = 'hidden';
    this.refs.step3.className = 'hidden';
    // this.refs.step4.className = 'hidden';

    switch (this.props.currentStep) {
      case 0:
        this.refs.step0.className = '';
        break;
      case 1:
        this.refs.step1.className = '';
        break;
      case 2:
        this.refs.step2.className = '';
        break;
      case 3:
        this.refs.step3.className = '';
        break;
      //   case 4:
      //     this.refs.step4.className = '';
      //     break;
    }
  }

  componentDidMount() {
    this.stepShow();
  }
  render() {
    return (
      <div style={{ padding: 50 }}>
        <Steps labelPlacement="vertical" current={this.props.currentStep}>
          <Step title="CR Registration" />
          <Step title="Company Registration" />
          <Step title="E-Mail Verification" />
          <Step title="OTP Verification" />
          {/* <Step title="Upload Documents" />
          <Step title="Admin Validation" /> */}
        </Steps>
        <br />
        <br />
        <div ref="step0" className="hidden">
          <CRRegisteration crCallback={this.crRegister} />
        </div>
        <div ref="step1" className="hidden">
          <CompanyRegistration companyCallback={this.companyRegister} />
        </div>
        <div ref="step2" className="hidden">
          <EmailVerification />
        </div>
        <div ref="step3" className="hidden">
          <OTPVerification />
        </div>
        {/* <div ref="step4" className="hidden">
          <UploadDocument />
        </div>
        <div ref="step5" className="hidden">
          <AdminValidation />
        </div> */}
      </div>
    );
  }
}

function mapStateToProps({ currentStep }) {
  return { currentStep };
}
export default connect(mapStateToProps, actions)(withRouter(CompanyRegister));
