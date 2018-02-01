import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import React from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import "./index.css";
import { connect } from "react-redux";
import * as actions from "../../actions/app";
import Steps, { Step } from "rc-steps";

import Interviewee from "../../components/IntervieweeRegister/Interviewee";
import Academic from "../../components/IntervieweeRegister/Academic";
import OTPVerification from "../../components/register/OTPVerification";
import EmailVerification from "../../components/register/EmailVerification";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 0,
      user: ""
    };
    this.userRegister = this.userRegister.bind(this);
    this.callRegisterApi = this.callRegisterApi.bind(this);
    this.stepShow = this.stepShow.bind(this);
  }

  componentDidMount() {
    this.stepShow();
  }

  async userRegister(userData) {
    console.log("CALLBACK CALL");
    await this.setState({ user: userData });
    await this.props.changeCurrentStep(1);
    this.stepShow();
  }

  async callRegisterApi(academicData) {
    console.log("---------");
    console.log(this.state.user);
    console.log("---------INTERVIEWEE-------");
    console.log(academicData);
    console.log("---------------------------------");
    await this.props.registerInterview(
      this.state.user,
      academicData,
      this.props.history
    );
  }

  stepShow() {
    this.refs.step0.className = "hidden";
    this.refs.step1.className = "hidden";
    this.refs.step2.className = "hidden";
    this.refs.step3.className = "hidden";
    // this.refs.step4.className = 'hidden';

    switch (this.props.currentStep) {
      case 0:
        this.refs.step0.className = "";
        break;
      case 1:
        this.refs.step1.className = "";
        break;
      case 2:
        this.refs.step2.className = "";
        break;
      case 3:
        this.refs.step3.className = "";
        break;
    }
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <Steps labelPlacement="vertical" current={this.props.currentStep}>
          <Step title="Personal Details" />
          <Step title="Qualification" />
          <Step title="E-Mail Verification" />
          <Step title="OTP Verification" />
        </Steps>
        <br />
        <br />
        <div ref="step0" className="hidden">
          <Interviewee userCB={this.userRegister} />
        </div>
        <div ref="step1" className="hidden">
          <Academic academicCB={this.callRegisterApi} />
        </div>
        <div ref="step2" className="hidden">
          <EmailVerification />
        </div>
        <div ref="step3" className="hidden">
          <OTPVerification />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ currentStep }) {
  return { currentStep };
}
export default connect(mapStateToProps, actions)(withRouter(Profile));
