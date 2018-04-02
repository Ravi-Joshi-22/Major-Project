import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import './index.css';
import { connect } from 'react-redux';
import * as actions from '../../actions/app';
import Steps, { Step } from 'rc-steps';
import BusyIndicator from '../../components/common/busyIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Interviewee from '../../components/IntervieweeRegister/Interviewee';
import Secondary from '../../components/IntervieweeRegister/Secondary';
import SeniorSecondary from '../../components/IntervieweeRegister/SeniorSecondary';
import EmailVerification from '../../components/register/EmailVerification';
import OTPVerification from '../../components/register/OTPVerification';

class IntervieweeRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      user: '',
      secondary: '',
      seniorSecondary: '',
    };
    this.getUserDetails = this.getUserDetails.bind(this);
    this.getSecondaryDetails = this.getSecondaryDetails.bind(this);
    this.getSeniorSecondary = this.getSeniorSecondary.bind(this);
    this.stepShow = this.stepShow.bind(this);
    this.callRegisterApi = this.callRegisterApi.bind(this);
  }

  async getUserDetails(userData) {
    await this.setState({ user: userData });
    await this.props.changeCurrentStep(1);
    this.stepShow();
  }
  async getSecondaryDetails(secondaryData) {
    await this.setState({ secondary: secondaryData });
    await this.props.changeCurrentStep(2);
    this.stepShow();
  }
  async getSeniorSecondary(seniorData) {
    await this.setState({ seniorSecondary: seniorData });
    await this.props.changeCurrentStep(3);
    this.stepShow();
    this.callRegisterApi(this.state);
  }
  async callRegisterApi(academicData) {
    await this.props.registerInterview(
      this.state.user,
      academicData,
      this.props.history
    );
  }

  stepShow() {
    console.log('cureentStep' + this.props.currentStep);
    this.refs.step0.className = 'hidden';
    this.refs.step1.className = 'hidden';
    this.refs.step2.className = 'hidden';
    this.refs.step3.className = 'hidden';
    this.refs.step4.className = 'hidden';
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
      case 4:
        this.refs.step4.className = '';
        break;
      default:
        this.refs.step0.className = '';
        break;
    }
  }

  async componentDidMount() {
    await this.props.fetchUser();
    if (this.props.auth.verification_status === 'in_process') {
      await this.props.changeCurrentStep(4);
    } else if (this.props.auth.verification_status === 'email_verified') {
      await this.props.changeCurrentStep(5);
    }
    this.stepShow();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ padding: 50 }}>
          <Steps labelPlacement="vertical" current={this.props.currentStep}>
            <Step title="Personal Details" />
            <Step title="Secondary Details" />
            <Step title="Senior Secondary Details" />
            <Step title="E-Mail Verification" />
            <Step title="OTP Verification" />
          </Steps>
          <br />
          <br />
          <div ref="step0" className="hidden">
            <Interviewee userCB={this.getUserDetails} />
          </div>
          <div ref="step1" className="hidden">
            <Secondary scCB={this.getSecondaryDetails} />
          </div>
          <div ref="step2" className="hidden">
            <SeniorSecondary ssCB={this.getSeniorSecondary} />
          </div>
          <div ref="step3" className="hidden">
            <EmailVerification />
          </div>
          <div ref="step4" className="hidden">
            <OTPVerification />
          </div>
          {this.props.loading.isloading ? <BusyIndicator /> : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ currentStep, auth, loading }) {
  return { currentStep, auth, loading };
}
export default connect(mapStateToProps, actions)(
  withRouter(IntervieweeRegister)
);
